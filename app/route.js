const express = require('express'),
    router = express.Router();

let mainController = require('./controllers/home_controller');

router.get('/', mainController.home);

module.exports = router;

