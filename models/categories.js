const { sequelize } = require("../config/postgres");
const { DataTypes } = require("sequelize");

const Categories = sequelize.define(
  "categories",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  } 
);

module.exports = Categories;