const User = require("../models/User");

const register = async (username, password) => {
  return User.create({ username, password: password });
};

const login = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user || password !== user.password) {
    throw new Error("Invalid username or password");
  }
  return { username: user.username };
};

module.exports = { register, login };
