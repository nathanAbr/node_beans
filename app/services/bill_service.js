const Bill =  require('../../models/bill'),
    Customer = require('../../models/company').customerModel,
    Provider = require('../../models/company').providerModel;


function listInBill(year) {
    firstDate = new Date(year, 0, 1);
    lastDate = new Date(year, 11, 31);
    return Bill.find({
        "customer":{$exists:false},
        "provider":{$exists:true}
    }).populate("provider");
}

function listOutBill(year) {
    firstDate = new Date(year, 0, 1);
    lastDate = new Date(year, 11, 31);
    return Bill.find({
        "provider":{$exists:false},
        "customer":{$exists:true}
    }).populate("customer");
}

module.exports = {
    listInBill: listInBill,
    listOutBill: listOutBill,
};

