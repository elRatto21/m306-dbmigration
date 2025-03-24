// GameSession.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GameSession = sequelize.define(
  "GameSession",
  {
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bet: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    win: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {}
);

module.exports = GameSession;
