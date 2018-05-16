const services = require('../services/bill_service');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();

function Controller(){}

function listInBillSI(req, res) {
    if(typeof req.get("year") !== 'undefined' && req.get("year") !== "" && req.get("year") !== null){
        services.listInBillSI(req.get("year")).then((bills)=>{
            console.log(bills);
            res.render('bills_view', {bills:bills});
        });
    } else {
        services.listInBillSI(currentYear).then((bills)=>{
            console.log(bills);
            res.render('bills_view', {bills:bills});
        });
    }
}

module.exports = {
    listInBillSI: listInBillSI,
};