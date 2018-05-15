const services = require('../services/bill_service');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();

function Controller(){}

function listInBill(req, res) {
    if(typeof req.get("year") !== 'undefined' && req.get("year") !== "" && req.get("year") !== null){
        res.render('bills_view', {bills:services.listInBill(req.get("year"))});
    } else {
        res.render('bills_view', {bills:services.listInBill(currentYear)});
    }
}

module.exports = {
    listInBill: listInBill,
};