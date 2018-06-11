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
    }).populate("provider").exec();
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
    }).populate("customer").exec();
}

// Create a bill
function processAddBill(params){
    let bill = new Bill(params);
    return bill.save();
}

function processAddBillRecursive(params){
    let bills = params.map((billParam) => new Bill(billParam));
    return Bill.insertMany(bills);
}

function calcCustomerVAT(year){
    const vat =  mongoose.model('vat',new mongoose.Schema({vat_amount:Number,amount:Number,vat:Number, alltaxes:Number}));
    firstDate = new Date(year, 0, 1);
    lastDate = new Date(year, 11, 31);
    return Bill.aggregate([
        {
            "$match":{
                "provider":{$exists:false},
                "customer":{$exists:true},
                "action_date": {$gt: firstDate, $lt: lastDate},
                "vat":{$gt:0}
            }
        },{
            "$project": {
                vat_amount:{
                    $divide:[{$multiply:[
                        "$amount",
                        "$vat"
                    ]},100]
                },
                amount:1, 
                    vat:1
            }
        },{
            "$project": {
                amount:1, vat:1, vat_amount:1, alltaxes:{
                    $add:[
                        "$vat_amount",
                        "$amount"
                    ]
                }
            }
        },
        {
            "$out":"vat"
        }]).exec(()=>{
        vat.aggregate([{$project:{"total_vat":{}}}])
    });
}


function recapInBills(year){
    console.log("todo: bill_service/recapInBills!");
    return new Promise(resolve => {
        resolve({total : 0})
    })
}
function recapOutBills(year){
    //calcCustomerVAT(year);
    firstDate = new Date(year, 0, 1);
    lastDate = new Date(year, 11, 31);
    return Bill.aggregate([
        {
            "$match":{
                "provider":{$exists:false},
                "customer":{$exists:true},
                "action_date": {$gt: firstDate, $lt: lastDate},
            }
        },
        {
            "$group": {
                _id: {year: {$year: "$action_date"}},
                totalAmount: {$sum: "$amount"},
                day_number: {$sum: "$day_number"},
                count: {$sum: 1},
                payed: {
                    $sum: {
                        $cond: [{
                            $gt: ["$payment_date", null]
                        }, "$amount", 0]
                    }
                },
                due: {
                    $sum: {
                        $cond: [{
                            $lt: ["$payment_date", null]
                        }, "$amount", 0]
                    }
                },
                todo: {
                    $sum: {
                        $cond: [{
                            $lt: ["$billing_date", null]
                        }, "$amount", 0]
                    }
                },
            },
        },
        {
            "$project": {
                vat_amount:{
                    $divide:[{$multiply:[
                            "$amount",
                            "$vat"
                        ]},100]
                },
                todo: 1,
                due: 1,
                payed: 1,
                totalAmount: 1,
                count: 1,
                day_number: 1,
            }
        },
    ]).exec();
}

module.exports = {
    findOneBill: findOneBill,
    billSelect: billSelect,
    listInBill: listInBill,
    processAddBill : processAddBill,
    processAddBillRecursive : processAddBillRecursive,
    listOutBill: listOutBill,
    processUpdateBill : processUpdateBill,
    recapInBills: recapInBills,
    recapOutBills: recapOutBills,
};

