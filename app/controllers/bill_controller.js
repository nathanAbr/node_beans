const services = require('../services/bill_service');
const customerService = require('../services/customer_service');
const providerService = require('../services/provider_service');
const errorHandler = require('../error_management');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let recap = {};
let range;

function listInBill(req, res) {
    if(typeof req.get("year") !== 'undefined' && req.get("year") !== "" && req.get("year") !== null) range = req.get("year");
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
    if(typeof req.get("year") !== 'undefined' && req.get("year") !== "" && 
       req.get("year") !== null) range = req.get("year");
    else range = currentYear;
    services.recapOutBills(range).then((data)=>{
        recap.total = data[0].totalAmount;
        recap.count = data[0].count;
        recap.year = data[0].year;
        console.log('recapOut: '+JSON.stringify(recap));
        services.listOutBill(range).then((bills)=>{
            res.render('bills_view', {title:"Factures sortantes", bills:bills, recap: recap});
        });
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