const { getBalance, updateBalance } = require("../services/userService");

const getUserBalance = async (req, res) => {
  try {
    const balance = await getBalance(req.query.username);
    res.json({ balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUserBalance = async (req, res) => {
  try {
    const { amount } = req.body;
    const balance = await updateBalance(req.query.username, amount);
    res.json({ balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getUserBalance, updateUserBalance };
