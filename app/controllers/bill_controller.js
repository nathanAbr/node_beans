const services = require('../services/bill_service');
const customerService = require('../services/customer_service');
const providerService = require('../services/provider_service');
const errorHandler = require('../error_management');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();

function updateBill(req, res) {
    var val = verifyValues(req);
    if(!val) {
        services.updateBill(req, res);
        console.log('update bill');
    }
    else {
        console.log(val);
    }
}

function listInBill(req, res) {
    
    if(typeof req.get("year") !== 'undefined' && req.get("year") !== "" && req.get("year") !== null){
        services.recapInBills(req.get("year"));
        services.listInBill(req.get("year")).then((bills)=>{
            console.log(bills);
            res.render('bills_view', {bills:bills});
        });
    } else {
        services.recapInBills(currentYear);
        services.listInBill(currentYear).then((bills)=>{
            console.log(bills);
            res.render('bills_view', {bills:bills});
        });
    }
}

function listOutBill(req, res) {
    if(typeof req.get("year") !== 'undefined' && req.get("year") !== "" && req.get("year") !== null){
        services.listOutBill(req.get("year")).then((bills)=>{
            console.log(bills);
            res.render(res, 'bills_view', {bills:bills});
        });
    } else {
        services.listOutBill(currentYear).then((bills)=>{
            console.log(bills);
            res.render('bills_view', {bills:bills});
        });
    }
}

/*
    montre le formulaire d'ajout d'une facture
    
    var query = Band.findOne({name: "Guns N' Roses"});
    assert.ok(!(query instanceof Promise));

    // A query is not a fully-fledged promise, but it does have a `.then()`.
    query.then(function (doc) {
      // use doc
    });

    // `.exec()` gives you a fully-fledged promise
    var promise = query.exec();
    assert.ok(promise instanceof Promise);

    promise.then(function (doc) {
      // use doc
    });
*/
function addBill(req,res){
    providerService.providerSelect().exec().then((providers)=>{
        customerService.customerSelect().exec().then( (customers)=>{
            console.log('providers: '+providers+'; customers: '+customers);
            res.render('bill_add',{customers: customers, providers: providers, title:'Ajout d\'une facture'});
        })
    });        
    //    console.log('providers: '+providers);
        
      //      console.log('customers: '+customers);
             /*res.render('bill_add',{customers: customers, providers: providers, title:'Ajout d\'une facture'})*/
}

function processAddBill(req, res) {    
    let params = req.body;
    console.log('params received!!! '+params);
    if (params.action_date) params.action_date = new Date(params.action_date);
    if (params.billing_date) params.billing_date = new Date(params.billing_date);
    if (params.recovery_date) params.recovery_date = new Date(params.recovery_date);
    if (params.payment_date) params.payment_date = new Date(params.payment_date); 
    
    services.processAddBill(params).then((err,bill)=>{
        if (err) return res.send(err);
        console.log(bill); 
        res.render('bills_view',{bills:bill})});
}
    
module.exports = {
    listInBill: listInBill,
    addBill: addBill,
    processAddBill: processAddBill,
    listOutBill: listOutBill,
    updateBill: updateBill
};
    
function verifyValues(req) {
    
    if(req.body.type !== 'Formation' && req.body.type !== 'Dev') {
        return errorHandler.valueError('bill service type');
    }
    
    if(typeof req.body.designation !== 'string') {
        return errorHandler.typeError('bill label', 'string');
    }
    
    if(typeof req.body.amount !== 'number') {
        return errorHandler.typeError('bill amount', 'number');
    }
    
    if(req.body.amount < 0) {
        return errorHandler.valueError('bill amount');
    }
    
    if(typeof req.body.vat !== 'number') {
        return errorHandler.typeError('bill tva', 'number');
    }
    
    if(req.body.vat < 0 || req.body.vat > 25) {
        return errorHandler.valueError('bill tva');
    }
    
    if(typeof req.body.action_date !== 'object') {
        return errorHandler.typeError('bill service date', 'object');
    }
    
    if(typeof req.body.billing_date !== 'string') {
        return errorHandler.typeError('bill date', 'object');
    }
    
    if(req.body.billing_date < req.body.action_date) {
        return errorHandler.valueError('bill date');
    }
    
    if(typeof req.body.payment_date !== 'string') {
        return errorHandler.typeError('bill payment date', 'object');
    }
    
    if(req.body.payment_date < req.body.billing_date) {
        return errorHandler.valueError('bill payment date');
    }
    
    if(typeof req.body.recovery_date !== 'string') {
        return errorHandler.typeError('bill reflation date', 'object');
    }
    
    return '';
}
