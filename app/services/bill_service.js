const Bill =  require('../../models/bill'), Customer = require('../../models/company').customerModel, Provider = require('../../models/company').providerModel;

function addBill(req, res) {
    let bill = new Bill(req.body);
    bill.save().then(
            (doc) => {
                res.send(doc);
    });
}

function updateBill(req, res) {
    Bill.findByIdAndUpdate(
        req.body.id, { 
            $set: { 
                customer : req.body.customer
                , type: req.body.type
                , designation : req.body.designation
                , amount : req.body.amount
                , vat : req.body.vat
                , action_date : req.body.action_date
                , billing_date : req.body.billing_date
                , payment_date : req.body.payment_date
                , recovery_date : req.body.recovery_date
            }
        }, { 
        new: true 
    }, function (err, doc) {
	  if (err) return console.log(err);
	  res.send(doc);
    }
);}

function listInBillSI(year) {
    firstDate = new Date(year, 0, 1);
    lastDate = new Date(year, 11, 31);
    return Bill.find({
        type: "Dev"
    }).populate("customer");
}

module.exports = {
    listInBillSI: listInBillSI,
    addBill : addBill,
    updateBill : updateBill
};

