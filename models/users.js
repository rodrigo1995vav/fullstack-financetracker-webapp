const { sequelize } = require("../config/postgres");
const { DataTypes } = require("sequelize");
const Transactions = require("./transactions");
const Refresh = require("./refreshTokens");

const Users = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

Users.hasMany(Transactions)

Transactions.belongsTo(Users)

Users.hasOne(Refresh)

Refresh.belongsTo(Users)

module.exports = Users;