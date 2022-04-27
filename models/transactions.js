const { sequelize } = require("../config/postgres");
const { DataTypes } = require("sequelize");

const Transactions = sequelize.define(
  "transactions",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Transactions;