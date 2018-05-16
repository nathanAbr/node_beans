let Bill =  require('../../models/bill');

function Service(){}

Service.prototype.addBill = (req, res) => {
    let bill = new Bill(req.body);
    bill.save().then(
            (doc) => {
                res.send(doc);
    });
};

Service.prototype.updateBill = (req) => {
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
);};

Service.prototype.listInBill = (year) => {
    let result = null;
    Bill.find({
        date_prestation: {"$gte":new Date(year, 1, 1)}
    }).then((data) => {
        result = data;
    });
    return result;
};

function listInBill(year) {
    console.log(new Date(year, 1, 1));
    console.log(new Date(year, 12, 31));
    return Bill.find({date_prestation:{"$gte":new Date(year, 1, 1), "$lte":new Date(year, 12, 30)}});
}

module.exports = {
    listInBill: listInBill,
};

