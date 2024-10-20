const axios = require("axios");

exports.makeCall = async (req, res) => {
  const { name, number } = req.body;
  const document = process.env.DOCUMENT;
  const nameBot = process.env.NAME_BOT;

  const data = {
    name: name,
    number: number,
    document: document,
    nameBot: nameBot,
  };

  try {
    const response = await axios.post("https://apicall.concilbot.com/call", data, {
      headers: { "Content-Type": "application/json" },
    });

    return res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Error making the call" });
  }
};
