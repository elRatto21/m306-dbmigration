const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const coinflipRoutes = require("./routes/coinflip");
const gameRoutes = require("./routes/game");
const sequelize = require("./config/database");
const cors = require("cors");

const User = require("./models/User");
const Game = require("./models/Game");
const GameSession = require("./models/GameSession");

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/coinflip", coinflipRoutes);
app.use("/api/game", gameRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
