const axios = require("axios");

// Function to write on blockchain
exports.writeOnBlockChain = async (req, res) => {
  const { text, chainName = "avalanche" } = req.body;
  const tokenSoft = process.env.TOKEN_SOFT;

  const data = {
    tokenSoft: tokenSoft,
    chainName: chainName,
    textSave: text,
  };

  try {
    const response = await axios.post("https://transactionevm.concilbot.com/blockchain/send", data, {
      headers: { "Content-Type": "application/json" },
    });

    return res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Error sending data to blockchain" });
  }
};
