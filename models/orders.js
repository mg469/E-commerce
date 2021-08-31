module.exports = (sequelize, DataTypes)=>{
    const orders = sequelize.define("orders", {
        // oId: {
        //     type: DataTypes.INTEGER,
        //     allowNull : false,
        //     primaryKey : true
        // },
        qty: {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        amt: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    
    })

    orders.associate = function(models){
        orders.belongsTo(models.cart, {
            foreignKey: "cartId"
        })

    }

    return orders
}
