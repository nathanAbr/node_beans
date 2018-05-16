const Bill =  require('../../models/bill'), Company = require('../../models/company').customerModel;

function listInBillSI(year) {
    firstDate = new Date(year, 0, 1);
    lastDate = new Date(year, 11, 31);
    return Bill.find({

        type: "Dev"
    }).populate("customer");
}

module.exports = {
    listInBillSI: listInBillSI,
};

