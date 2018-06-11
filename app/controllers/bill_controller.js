const services = require('../services/bill_service');
const customerService = require('../services/customer_service');
const providerService = require('../services/provider_service');
const errorHandler = require('../error_management');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let recap = {};
let range;

function listInBill(req, res) {
    if(typeof req.query.year !== 'undefined' && req.query.year !== "" && req.query.year !== null) range = req.query.year;
    else range = currentYear;
    recap = services.recapInBills(range).then((data)=>{
        recap = data;
        console.log('recapIn: '+JSON.stringify(recap));
        
        services.listInBill(range).then((bills)=>{
            res.render('bills_view', {title:"Factures entrantes",bills:bills, recap: recap});
        });
    });
}

function listOutBill(req, res) {
    if(typeof req.query.year !== 'undefined' && req.query.year !== "" &&
        req.query.year !== null) range = req.query.year;
    else range = currentYear;
    services.recapOutBills(range).then((data)=>{
        console.log(data);
        if(data.length > 0) {
            console.log(data[0].vat_amount);
            recap.tva = data[0].vat_amount;
            recap.total = data[0].totalAmount;
            recap.count = data[0].count;
            recap.year = data[0].year;
            recap.day = data[0].day_number;
            recap.payed = data[0].payed;
            recap.due = data[0].due;
            recap.todo = data[0].todo;
            console.log('recapOut: ' + JSON.stringify(recap));
            services.listOutBill(range).then((bills) => {
                res.render('bills_view', {title: "Factures sortantes", bills: bills, recap: recap});
            });
        } else {
            services.listOutBill(range).then((bills) => {
                res.render('bills_view', {title: "Factures sortantes", bills: bills});
            });
        }
    });
    
    
}

/*
    montre le formulaire d'ajout d'une facture
*/
function addBill(req,res){
    providerService.providerSelect().exec().then((providers)=>{
        customerService.customerSelect().exec().then( (customers)=>{
            console.log('providers: '+providers+'; customers: '+customers);
            res.render('bill_add',{customers: customers, providers: providers, title:'Ajout d\'une facture'});
        });
    });        
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
    services.processAddBill(params).then((err,bill)=>{
        if (err) return res.send(err);
        console.log(bill); 
        res.render('bills_view',{bills:bill});
    });
}

function updateBill(req,res){
    services.billSelect().exec().then((bills) => {
        providerService.providerSelect().exec().then((providers)=>{
            customerService.customerSelect().exec().then( (customers)=>{
                res.render('bill_update',{bill:0, bill_id: req.params.id, bills: bills, customers: customers, providers: providers, title:'Edition d\'une facture'});
            });
        });
    });
}

function updateOneBill(req,res){
    services.findOneBill(req.params.id).exec().then((bill) => {
        console.log('bill: ' +bill);
        res.send({bill: bill});
    });
}

function processUpdateBill(req, res) {
        let params = req.body;
        console.log(req.body);
        services.processUpdateBill(params).then((err, bill) => {
            if (err) return res.send(err);
            console.log(bill); 
            res.render('bills_view',{title:'updateBill',bills:bill});
        });
}
    
module.exports = {
    listInBill: listInBill,
    listOutBill: listOutBill,
    addBill: addBill,
    processAddBill: processAddBill,
    updateBill: updateBill,
    updateOneBill: updateOneBill,
    processUpdateBill: processUpdateBill
};