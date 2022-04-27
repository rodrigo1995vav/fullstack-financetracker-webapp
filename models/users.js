const { sequelize } = require("../../config/postgres");
const { DataTypes } = require("sequelize");
const Transactions = require("./transactions");

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
module.exports = Users;