const express = require('express'),
    router = express.Router();
    
let mainController = require('./controllers/home_controller');
let billController = require('./controllers/bill_controller');
let customerController = require('./controllers/customer_controller');
let providerController = require('./controllers/provider_controller');

router.get('/', mainController.home);
router.get('/bill', billController.addBill)
router.post('/bill',billController.processAddBill);

//Bill Controller
router.get('/bills/in', billController.listInBill);
router.get('/bills/out', billController.listOutBill);
router.put('/update_bill', billController.updateBill);

//Middleware

//Customer Controller
router.get('/customers', customerController.customersList);

//Provider Controller
router.get('/providers', providerController.providersList);


module.exports = router;
