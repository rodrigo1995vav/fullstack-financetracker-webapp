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
    },
    operationDate:{
      type: DataTypes.DATEONLY
    }
  }
);

module.exports = Transactions;