const express = require('express')
const router = express.Router()
const db = require('../models')
const prod = require('../models/prod')
const category = require('../models/category')
const brand = require('../models/brand')
const specs = require('../models/specs')
const cart = require('../models/cart')
const orders = require('../models/orders')
const order_items = require('../models/order_items')

// calls for category
router.get("/category/all", (req, res)=>{
    db.category.findAll().then(category => res.send(category))

})

router.get('/category/:cId', (req, res)=>{
    console.log('hello')
    db.category.findAll({
        where: {
            cId: req.params.cId
        }
    }).then(category => res.send(category))
})

router.post('/category/new', (req, res)=>{
    db.category.create({
        cId: req.body.cId,
        title: req.body.title,
        


    }).then(submitedCategory => res.send(submitedCategory))
})

router.delete('/delete/:cId', (req, res)=>{
    db.category.destroy({
        where:{
            cId: req.params.cId
        }
    }).then(() => res.send('success'))
})

//calls for prod
router.get("/products/All", (req, res)=>{
    db.prod.findAll().then(prod => res.send(prod))

})
router.get('/products/:pId', (req, res)=>{
    console.log('hello')
    db.prod.findAll({
        where: {
            pId: req.params.pId
        }
    }).then(prod => res.send(prod))
})
router.post('/products/new', (req, res)=>{
    db.prod.create({
        pId: req.body.pId,
        title: req.body.title,
        price: req.body.price,
        ratings: req.body.ratings,
        categoryCId: req.body.categoryCId,
        brandBId: req.body.brandBId

        


    }).then(submitedProd => res.send(submitedProd))
})
router.delete('/delete/products/:pId', (req, res)=>{
    db.prod.destroy({
        where:{
            pId: req.params.pId
        }
    }).then(() => res.send('success'))
})

//brand calls
router.get("/brand/all", (req, res)=>{
    db.brand.findAll().then(brand => res.send(brand))

})

router.get('/brand/:bId', (req, res)=>{
    console.log('hello')
    db.brand.findAll({
        where: {
            bId: req.params.bId
        }
    }).then(brand => res.send(brand))
})

router.post('/brand/new', (req, res)=>{
    db.brand.create({
        bId: req.body.bId,
        name: req.body.name,
        


    }).then(submitedBrand => res.send(submitedBrand))
})
router.delete('/delete/brand/:bId', (req, res)=>{
    db.brand.destroy({
        where:{
            bId: req.params.bId
        }
    }).then(() => res.send('success'))
})


//calls for specs
router.get("/specs/all", (req, res)=>{
    db.specs.findAll().then(specs => res.send(specs))

})

router.get('/specs/:id', (req, res)=>{
    console.log('hello')
    db.specs.findAll({
        where: {
            id: req.params.id
        }
    }).then(specs => res.send(specs))
})

router.post('/specs/new', (req, res)=>{
    db.specs.create({
        id: req.body.id,
        name: req.body.name,
        value: req.body.value,
        prodPID: req.body.prodPID
        


    }).then(submitedSpecs => res.send(submitedSpecs))
})
router.delete('/delete/specs/:id', (req, res)=>{
    db.specs.destroy({
        where:{
            id: req.params.id
        }
    }).then(() => res.send('success'))
})

//calls for cart

router.get("/cart/all", (req, res)=>{
    db.cart.findAll({
        where : {flag : 1},
        include: [{
            model : db.prod,
        
        

        }]
    }).then(cart => res.send(cart))

})


router.get("/cart/:cartId", (req, res)=>{
    db.cart.findAll({
        where:{
            cartId: req.params.cartId,
            flag : 1
            
        },
        include: [{
            model : db.prod,

        }]  
        
    }).then(cart => res.send(cart))

})



router.post('/cart/new', (req, res)=>{
    db.cart.create({
        cartId: req.body.cartId,
        qty: req.body.qty,
        pId: req.body.pId
        


    }).then(submitedCart => res.send(submitedCart))
})

//calls for orders

router.post('/checkout', async (req, res)=>{
    const cart_data = await db.cart.findAll({
        where : {flag : 1}
    });
    console.log(JSON.parse(JSON.stringify(cart_data)))
    const cartJSON = JSON.parse(JSON.stringify(cart_data));
    const arr = [];
    cartJSON.forEach((element, index) => {
        arr.push({
            // oId: index + 1,
            qty: element.qty,
            cartId: element.cartId,
            amt: 100,
            productId: element.pId,
        })
    });
    // const arr = []
    // cart_data.forEach(data => {
    
    //     arr.push(data.toJSON());
    // })
    // db.orders.create({
    //     oId: req.body.oId,
    //     qty: req.body.qty,
    //     amt: req.body.amt,
    //     cartId: req.body.cartId
        
    db.orders.bulkCreate(arr, {returning: true})
    console.log(arr)

    // }).then(submitedOrders => res.send(submitedOrders))
    // // function myFunction(item, arr){
    // // }
    // console.log(arr[1])
    
    db.cart.update({
        flag : 0,},
        {where : {},
        

    }).then(() => res.send('success'))
})

router.get("/orders/all", (req, res)=>{
    db.orders.findAll().then(orders => res.send(orders))

})

router.delete('/delete/orders/:oId', (req, res)=>{
    db.orders.destroy({
        where:{
            oId: req.params.oId
        }
    }).then(() => res.send('success'))
})

//calls for order items


router.post('/buyNow', async (req, res)=>{
    const order_data = await db.orders.findAll({
        where :{}
    });
    console.log(JSON.parse(JSON.stringify(order_data)))
    const orderJSON = JSON.parse(JSON.stringify(order_data));
    const arrr = [];
    orderJSON.forEach((element, index) => {
        arrr.push({
            oiId: index + 1,
            qty: element.qty,
            amt: 100,
            pId: element.productId,
        })
    });
        
    db.order_items.bulkCreate(arrr, {returning: true}).then(() => res.send('success'))
})

router.get("/order_items/all", (req, res)=>{
    db.order_items.findAll({
        
        include: [{
            model : db.prod,
        
        

        }]
    }).then(order_items => res.send(order_items))

})








// router.put('/edit/:id', (req, res)=>{
//     console.log(req.params)
//     db.prod.update({
//         title: req.body.title,
//         price: req.body.price,
//         ratings: req.body.ratings,
//         categoryId: req.body.categoryId,
//         brandId: req.body.brandId
//     }, {
//         where: {
//             id: req.params.id
//         }
//     }).then(()=> res.send('success'))
// })
module.exports = router