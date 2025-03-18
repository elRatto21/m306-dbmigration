const UserService = require("./userService");

const coinflip = async (username, bet, side) => {
  if (bet < 0) {
    throw new Error("Bet must be positive");
  }
  if (side !== "heads" && side !== "tails") {
    throw new Error("Side must be heads or tails");
  }

  const result = Math.random() < 0.5 ? "heads" : "tails";

  const balance = await UserService.updateBalance(
    username,
    bet * (result === side ? 1 : -1)
  );

  return { side: side, result: result, bet: bet, balance: balance };
};

module.exports = { coinflip };
