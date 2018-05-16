
const express = require('express'),
    router = express.Router();
    
let mainController = require('./controllers/home_controller');
let billController = require('./controllers/bill_controller');

router.get('/', mainController.home);
router.get('/bills', billController.listInBill);
router.post('/add_bill', billController.addBill);
router.put('/update_bill', billController.updateBill);

module.exports = router;
