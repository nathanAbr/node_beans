let Bill =  require('../../models/bill');

function Service(){}

Service.prototype.addBill = (req, res) => {
    let bill = new Bill(req.body);
    bill.save().then(
            (doc) => {
                res.send(doc);
    });
};

module.exports = Service;

