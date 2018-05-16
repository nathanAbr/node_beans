const services = require('../services/bill_service');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();

function Controller(){}

function listInBill(req, res) {
    if(typeof req.get("year") !== 'undefined' && req.get("year") !== "" && req.get("year") !== null){
        services.listInBill(req.get("year"), (bills)=>{
            res.render('bills_view', {bills:bills});
        });
    } else {
        services.listInBill(currentYear, (bills)=>{
            res.render('bills_view', {bills:bills});
        });
    }
}

module.exports = {
    listInBill: listInBill,
};