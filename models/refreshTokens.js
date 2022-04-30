const { sequelize } = require("../config/postgres");
const { DataTypes } = require("sequelize");

const Refresh = sequelize.define(
  "refreshToken",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
  }
);


module.exports = Refresh;