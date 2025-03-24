const { register, login } = require("../services/authService");

const registerUser = async (req, res) => {
  try {
    const user = await register(req.body.username, req.body.password);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await login(req.body.username, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };
