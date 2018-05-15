var express = require('express');
var router = express.Router();

const billController = require('controllers/bill_controller');

router.get('/add_bill', billController.addBill);

module.exports = router;


