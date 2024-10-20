const express = require("express");
const router = express.Router();
const callController = require("../controllers/callController");

router.post("/make", callController.makeCall);

module.exports = router;
