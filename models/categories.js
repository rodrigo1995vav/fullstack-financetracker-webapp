const { sequelize } = require("../../config/postgres");
const { DataTypes } = require("sequelize");
const Transactions = require("./transactions");

const Categories = sequelize.define(
  "categories",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  } 
);

Categories.hasMany(Transactions, {
  foreignKey:'categoryId',
  sourceKey:'id'
})

Transactions.belongsTo(Categories,{
  foreignKey:'categoryId',
  tagetId:'id'
})

module.exports = Categories;