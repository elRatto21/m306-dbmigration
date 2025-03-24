const User = require("../models/User");

const getBalance = async (username) => {
  const user = await User.findOne({ where: { username: username } });
  return user.balance;
};

const updateBalance = async (username, amount) => {
  const user = await User.findOne({ where: { username: username } });
  user.balance += amount;
  await user.save();
  return user.balance;
};

module.exports = { getBalance, updateBalance };
