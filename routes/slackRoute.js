const express = require('express');
const router = express.Router();
const slackController = require('../controllers/slackController');


router.post('/send', slackController.sendData);

module.exports = router;
