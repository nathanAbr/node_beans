const services = require('../services/bill_service');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();

function Controller(){}

function listInBill(req, res) {
    if(typeof req.get("year") !== 'undefined' && req.get("year") !== "" && req.get("year") !== null){
        services.listInBill(req.get("year")).then((bills)=>{
            console.log(bills);
            res.render('bills_view', {bills:bills});
        });
    } else {
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

module.exports = {
    listInBill: listInBill,
    listOutBill: listOutBill,
};