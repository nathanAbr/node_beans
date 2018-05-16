const services = require('../services/bill_service');
const errorHandler = require('../error_management');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();

function addBill(req, res) {
    var val = verifyValues(req);
    if(!val) {
        services.addBill(req, res);
        console.log('add Bill');
    }
    else {
        console.log(val);
    }
}

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
        services.listInBill(req.get("year")).then((bills)=>{
            res.render('bills_view', {bills:bills});
        });
    } else {
        services.listInBill(currentYear).then((bills)=>{
            res.render('bills_view', {bills:bills});
        });
    }
}

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
    
    if(typeof req.body.billing_date !== 'object') {
        return errorHandler.typeError('bill date', 'object');
    }
    
    if(req.body.billing_date < req.body.action_date) {
        return errorHandler.valueError('bill date');
    }
    
    if(typeof req.body.payment_date !== 'object') {
        return errorHandler.typeError('bill payment date', 'object');
    }
    
    if(req.body.payment_date < req.body.billing_date) {
        return errorHandler.valueError('bill payment date');
    }
    
    if(typeof req.body.recovery_date !== 'object') {
        return errorHandler.typeError('bill reflation date', 'object');
    }
    
    return '';
}

module.exports = {
    listInBill: listInBill
    , addBill: addBill
    , updateBill: updateBill
};