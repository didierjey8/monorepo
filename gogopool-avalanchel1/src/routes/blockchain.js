const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/blockchainController');

router.post('/getBalance', blockchainController.getBalance);
router.post('/getTransaction', blockchainController.getTransaction);
router.post('/send', blockchainController.sendTransaction);

module.exports = router;
