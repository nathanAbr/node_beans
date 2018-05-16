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
            res.render('bills_view', {bills:bills});
        });
    } else {
        services.listOutBill(currentYear).then((bills)=>{
            console.log(bills);
            res.render('bills_view', {bills:bills});
        });
    }
}

function add(req, res) {    
    let params = req.body;
    if (params.action_date) params.action_date = new Date(params.action_date);
    if (params.billing_date) params.billing_date = new Date(params.billing_date);
    if (params.recovery_date) params.recovery_date = new Date(params.recovery_date);
    if (params.payment_date) params.payment_date = new Date(params.payment_date); 
    
    console.log(params.action_date);
    services.add(params).then(()=>{res.send("Bill is add in database !");});
    
    
   
}

//module.exports = Controller;
module.exports = {
    listInBill: listInBill,
    add: add,
    listOutBill: listOutBill,
};