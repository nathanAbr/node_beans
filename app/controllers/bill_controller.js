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

module.exports = Controller;