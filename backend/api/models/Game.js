// Game.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Game = sequelize.define(
  "Game",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    minPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minBet: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    maxBet: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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

module.exports = Game;
