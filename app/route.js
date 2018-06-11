const express = require('express'),
    router = express.Router();
    
let mainController = require('./controllers/home_controller');
let userController = require('./controllers/user_controller');
let billController = require('./controllers/bill_controller');
let customerController = require('./controllers/customer_controller');
let providerController = require('./controllers/provider_controller');
let bodyParserJson = require('body-parser').json();

function restrict(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
}

function anon(req, res, next) {
  if (req.user) {
    res.redirect('/bills/out');
  } else {
    next();
  }
}

//Main Controller
router.get('/', anon, mainController.home);

//User Controller
router.get('/signup', anon, userController.showSignup);
router.post('/signup', anon, userController.processSignup);
router.post('/login', anon, userController.processLogin);
router.get('/logout', restrict, userController.processLogout);

//Bill Controller
router.get('/bill', restrict, billController.addBill)
router.post('/bill', restrict, billController.processAddBill);
router.get('/bills/in', restrict, billController.listInBill);
router.get('/bills/out', restrict, billController.listOutBill);
router.get('/update_bill', restrict, billController.updateBill);
router.get('/update_bill/:id', restrict, billController.updateOneBill);
router.put('/update_bill', restrict, billController.processUpdateBill);

//Customer Controller
router.get('/customers', customerController.customersList);
router.get('/customer/:id', customerController.getOne);
router.get('/add_customer', customerController.addCustomer);
router.post('/add_customer', customerController.processAddCustomer);
router.get('/update_customer', customerController.updateCustomer);
router.get('/update_customer/:id', customerController.updateOneCustomer);
router.put('/update_customer', customerController.processUpdateCustomer);

//Provider Controller
router.get('/providers', providerController.providersList);
router.get('/add_provider', providerController.addProvider);
router.post('/add_provider', providerController.processAddProvider);
router.get('/update_provider', providerController.updateProvider);
router.get('/update_provider/:id', providerController.updateOneProvider);
router.put('/update_provider', restrict, bodyParserJson, providerController.processUpdateProvider);

module.exports = router;
