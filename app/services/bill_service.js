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
function add(req,res){
    let bill = new Bill(req.body);
	bill.save().then((doc)=>{res.send(doc);});
}

module.exports = {
    listInBill: listInBill,
    add : add,
    listOutBill: listOutBill,
};

