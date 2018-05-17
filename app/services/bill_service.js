const Bill =  require('../../models/bill'),
    Customer = require('../../models/company').customerModel,
    Provider = require('../../models/company').providerModel,
    mongoose = require('mongoose');

function billSelect() {
    return Bill.find({},{designation:1});
}

function findOneBill(id) {
    return Bill.find({_id: id});
} 

function listInBill(year) {
    firstDate = new Date(year, 0, 1);
    lastDate = new Date(year, 11, 31);
    return Bill.find({
        "customer":{$exists:false},
        "provider":{$exists:true},
        "action_date": {$gt: firstDate, $lt: lastDate}
    }).populate("provider");
}

function processUpdateBill(params) {
    billing_date = new Date(params.billing_date);
    payment_date = new Date(params.payment_date);
    return Bill.findByIdAndUpdate(
        params._id, { 
            $set: { 
                customer : params.customer
                , type: params.type
                , designation : params.designation
                , amount : params.amount
                , vat : params.vat
                , billing_date : billing_date
                , payment_date : payment_date
            }
        }, { 
        new: true 
    });
}


function listOutBill(year) {
    firstDate = new Date(year, 0, 1);
    lastDate = new Date(year, 11, 31);
    return Bill.find({
        "provider":{$exists:false},
        "customer":{$exists:true},
        "action_date": {$gt: firstDate, $lt: lastDate}
    }).populate("customer");
}

// Create a bill
function addBill(params){
    let bill = new Bill(params);
	return bill.save();
}

function recapInBills(year){
    return console.log("todo: bill_service/recapInBills!");
}

function recapOutBills(year){
    firstDate = new Date(year, 0, 1);
    lastDate = new Date(year, 11, 31);
    return Bill.aggregate([
        {
            "$match":{
                "provider":{$exists:false},
                "customer":{$exists:true},
                "action_date": {$gt: firstDate, $lt: lastDate}
            }
        },
       {
            "$group":{
                _id: { year: { $year: "$action_date" } },
                totalAmount: { $sum: "$amount" },
                count: { $sum: 1 }
            }
        }
    ]);
    
    
}
module.exports = {
    findOneBill: findOneBill,
    billSelect: billSelect,
    listInBill: listInBill,
    addBill : addBill,
    listOutBill: listOutBill,
    processUpdateBill : processUpdateBill,
    recapInBills: recapInBills,
    recapOutBills: recapOutBills
};

