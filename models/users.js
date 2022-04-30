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
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin"],
      defaultValue: "user"
    },
  },
  {
    timestamps: true,
  }
);

Users.hasMany(Transactions, {
  foreignKey: 'userId',
  sourceKey: 'id'
})


Transactions.belongsTo(Users, {
    foreignKey: 'userId',
    targetId: 'id'
})

Users.hasOne(Refresh)
Refresh.belongsTo(Users)

module.exports = Users;