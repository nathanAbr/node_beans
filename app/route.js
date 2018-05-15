const express = require('express'),
    router = express.Router();

let mainController = require('./controllers/home_controller');
let billController = require('./controllers/bill_controller');

router.get('/', mainController.home);

//Bill Controller
router.get('/bills', billController.listInBill);

module.exports = router;

