module.exports = (sequelize, DataTypes)=>{
    const prod = sequelize.define("prod", {
        pId: {
            type: DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull : false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        ratings: {
            type: DataTypes.DOUBLE,
            allowNull : false
        },
    });

    prod.associate = function(models){
        prod.belongsTo(models.category, {
            foreignKey: "cId"
        })

    }
    prod.associate = function(models){
        prod.belongsTo(models.brand, {
            foreignKey: "bId"
        })
    }
    prod.associate = function(models){
        prod.hasMany(models.specs), {
            foreignKey: "pId"
        }
    }
    

    return prod
}