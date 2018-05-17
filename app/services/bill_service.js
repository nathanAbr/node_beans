const Bill =  require('../../models/bill'),
    Customer = require('../../models/company').customerModel,
    Provider = require('../../models/company').providerModel,
    mongoose = require('mongoose');

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
    action_date = new Date(params.action_date);
    billing_date = new Date(params.billing_date);
    payment_date = new Date(params.payment_date);
    recovery_date = new Date(params.recovery_date);
    return Bill.findByIdAndUpdate(
        params.id, { 
            $set: { 
                customer : params.customer
                , type: params.type
                , designation : params.designation
                , amount : params.amount
                , vat : params.vat
                , action_date : action_date
                , billing_date : billing_date
                , payment_date : payment_date
                , recovery_date : recovery_date
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

function recapInBills(){
    Bill.aggregate([
        {"$match":{
            "provider":{$exists:false},
            "customer":{$exists:true}
            }
        }
    ]).then((err,result)=>{
        if(err) return console.log(err);
        console.log(result);
        return result;
    })
}

function recapOutBills(){
    return console.log("todo!");
}
module.exports = {
    listInBill: listInBill,
    addBill : addBill,
    listOutBill: listOutBill,
    processUpdateBill : processUpdateBill,
    recapInBills: recapInBills,
    recapOutBills: recapOutBills
};

