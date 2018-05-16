const Bill =  require('../../models/bill'), Company = require('../../models/company').customerModel;

function listInBillSI(year) {
    firstDate = new Date(year, 0, 1);
    lastDate = new Date(year, 11, 31);
    return Bill.find({
        action_date: {$gt: new Date(firstDate.toISOString()), $lt: new Date(lastDate.toISOString())},
        type: "Dev"
    }).populate("customer");
}

module.exports = {
    listInBillSI: listInBillSI,
};

