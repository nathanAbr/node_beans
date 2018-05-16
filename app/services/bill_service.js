const Bill =  require('../../models/bill'),
    Customer = require('../../models/company').customerModel,
    Provider = require('../../models/company').providerModel;


function listInBill(year) {
    firstDate = new Date(year, 0, 1);
    lastDate = new Date(year, 11, 31);
    return Bill.find({
        "customer":{$exists:true},
        "provider":{$exists:false}
    }).populate("customer");
}

function listOutBill(year) {
    firstDate = new Date(year, 0, 1);
    lastDate = new Date(year, 11, 31);
    return Bill.find({
        "provider":{$exists:true},
        "customer":{$exists:false}
    }).populate("provider");
}
// Create a bill
function addBill(params){
    let bill = new Bill(params);
	return bill.save();
}

module.exports = {
    listInBill: listInBill,
    addBill : addBill,
    listOutBill: listOutBill,
};

