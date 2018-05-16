const services = require('../services/bill_service');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();

function Controller(){}

Controller.prototype.listInBill = (year = currentYear) => {
    if(Number.isInteger(year)){
        return services.listInBill(year);
    } else {
        return null;
    }
}

function add(req, res) {
    res.send("Bill is add in database !");
}

//module.exports = Controller;
module.exports = {
    add: add
};