const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const coinflipRoutes = require("./routes/coinflip");
const gameRoutes = require("./routes/game");
const connectDB = require("./config/database");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/coinflip", coinflipRoutes);
app.use("/api/game", gameRoutes);

connectDB()
  .then(() => {
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });