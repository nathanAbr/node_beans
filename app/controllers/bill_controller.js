const services = require('../services/bill_service');
const ErrorHandler = require('../error_management');

let errorHandler = new ErrorHandler();
let currentDate = new Date();
let currentYear = currentDate.getFullYear();

function Controller(){}

Controller.prototype.addBill = (req, res, next) => {
    var val = verifyValues(req);
    if(!val) {
        console.log('good values');
    }
    else {
        console.log(val);
    }
};

Controller.prototype.updateBill = (req, res, next) => {
    var val = verifyValues(req);
    if(!val) {
        console.log('good values');
    }
    else {
        console.log(val);
    }
};

Controller.prototype.listInBill = (year = currentYear) => {
    if(Number.isInteger(year)){
        return services.listInBill(year);
    } else {
        return null;
    }
};

function verifyValues(req) {
    
    if(req.body.service_type !== 'Formation' && req.body.service_type !== 'Dev') {
        return errorHandler.valueError('bill service type');
    }
    
    if(typeof req.body.label !== 'string') {
        return errorHandler.typeError('bill label', 'string');
    }
    
    if(typeof req.body.amount !== 'number') {
        return errorHandler.typeError('bill amount', 'number');
    }
    
    if(req.body.amount < 0) {
        return errorHandler.valueError('bill amount');
    }
    
    if(typeof req.body.tva !== 'number') {
        return errorHandler.typeError('bill tva', 'number');
    }
    
    if(req.body.tva < 0 || req.body.tva > 25) {
        return errorHandler.valueError('bill tva');
    }
    
    if(typeof req.body.service_date !== 'object') {
        return errorHandler.typeError('bill service date', 'object');
    }
    
    if(typeof req.body.bill_date !== 'object') {
        return errorHandler.typeError('bill date', 'object');
    }
    
    if(req.body.bill_date < req.body.service_date) {
        return errorHandler.valueError('bill date');
    }
    
    if(typeof req.body.payment_date !== 'object') {
        return errorHandler.typeError('bill payment date', 'object');
    }
    
    if(req.body.payment_date < req.body.bill_date) {
        return errorHandler.valueError('bill payment date');
    }
    
    if(typeof req.body.reflation_date !== 'object') {
        return errorHandler.typeError('bill reflation date', 'object');
    }
    
    return '';
}

module.exports = Controller;