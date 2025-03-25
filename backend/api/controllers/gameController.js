const { getGames } = require("../services/gameService");

const getAllGames = async (req, res) => {
  try {
    const games = await getGames();
    res.json({ games });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAllGames };
