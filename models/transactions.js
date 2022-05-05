const { sequelize } = require("../config/postgres");
const { DataTypes } = require("sequelize");

const Transactions = sequelize.define(
  "transactions",
  {
    amount: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING
    },
    type:{
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Transactions;