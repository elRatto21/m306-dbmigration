const { coinflip } = require("../services/coinflipService");

const postCoinflip = async (req, res) => {
  try {
    const result = await coinflip(
      req.body.username,
      req.body.bet,
      req.body.side
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { postCoinflip };
