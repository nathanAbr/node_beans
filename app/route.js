const express = require('express'),
    router = express.Router();
    
let mainController = require('./controllers/home_controller');
let billController = require('./controllers/bill_controller');
let customerController = require('./controllers/customer_controller');
let providerController = require('./controllers/provider_controller');
let bodyParserJson = require('body-parser').json();

router.get('/', mainController.home);
//test route:
router.put('/', bodyParserJson, mainController.test);

//Bill Controller
router.get('/bill', billController.addBill);
router.post('/bill',billController.processAddBill);
router.get('/bills/in', billController.listInBill);
router.get('/bills/out', billController.listOutBill);
router.get('/update_bill', billController.updateBill);
router.get('/update_bill/:id', billController.updateOneBill);
router.put('/update_bill', billController.processUpdateBill);

//Middleware

//Customer Controller
router.get('/customers', customerController.customersList);
router.get('/customer/:id', customerController.getOne);
router.get('/add_customer', customerController.addCustomer);
router.post('/add_customer', customerController.processAddCustomer);
router.put('/update_customer', customerController.processUpdateCustomer);

//Provider Controller
router.get('/providers', providerController.providersList);
router.get('/add_provider', providerController.addProvider);
router.post('/add_provider', providerController.processAddProvider);
router.put('/update_provider', bodyParserJson, providerController.processUpdateProvider);

module.exports = router;
