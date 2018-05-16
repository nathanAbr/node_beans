const Bill =  require('../../models/bill'), Customer = require('../../models/company').customerModel, Provider = require('../../models/company').providerModel;

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

