const services = require('../services/bill_service');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();

function Controller(){}

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

function add(req, res) {
    console.log("BODY : "+req.body);
    services.add(req.body);
    res.send("Bill is add in database !");
   
}

//module.exports = Controller;
module.exports = {
    listInBill: listInBill,
    add: add
};