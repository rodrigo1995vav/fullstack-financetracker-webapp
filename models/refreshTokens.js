const { sequelize } = require("../config/postgres");
const { DataTypes } = require("sequelize");

const Refresh = sequelize.define(
  "transactions",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      valid_until: 10000
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

module.exports = Refresh;