var express = require('express');
var router = express.Router();

const billController = require('../controllers/bill_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add_bill', billController.addBill);

module.exports = router;
