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
            res.render('bills_view', {bills:bills});
        });
    } else {
        services.recapInBills(currentYear);
        services.listInBill(currentYear).then((bills)=>{
            res.render('bills_view', {bills:bills});
        });
    }
}

function listOutBill(req, res) {
    if(typeof req.get("year") !== 'undefined' && req.get("year") !== "" && req.get("year") !== null){
        services.listOutBill(req.get("year")).then((bills)=>{
            res.render(res, 'bills_view', {bills:bills});
        });
    } else {
        services.listOutBill(currentYear).then((bills)=>{
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
    
    let isRecursif = req.body.recursif;
    let params = req.body;
    params = JSON.parse(params.data);
    
    console.log(req.body.recursif);
    //let isRecursif = res.body.recursif;
    
    if (params.action_date) params.action_date = new Date(params.action_date);
    if (params.billing_date) params.billing_date = new Date(params.billing_date);
    if (params.recovery_date) params.recovery_date = new Date(params.recovery_date);
    if (params.payment_date) params.payment_date = new Date(params.payment_date); 
    
    if (params.amount) params.amount = parseInt(params.amount);
    if (params.vat) params.vat = parseInt(params.vat);

    if(isRecursif == 'true'){
        let paramsArray = [];
        let newBill = Object.assign({}, params);
        newBill.billing_date = new Date(params.billing_date);
        
        paramsArray.push(newBill);
        for(let i = 0; i < 23; ++i){
            newBill = Object.assign({}, params);
            newBill.billing_date = new Date(params.billing_date.setMonth(params.billing_date.getMonth()+1));
            paramsArray.push(newBill);
        }
        services.processAddBillRecursive(paramsArray).then((err,bill)=>{
            if (err) return res.send(err);
            res.render('bills_view', {bills:bill})});
    } 
    else{
        services.processAddBill(params).then((err,bill)=>{
            if (err) return res.send(err);
            res.render('bills_view', {bills:bill})});
    }
}
    
module.exports = {
    listInBill: listInBill,
    addBill: addBill,
    processAddBill: processAddBill,
    listOutBill: listOutBill,
    updateBill: updateBill
};