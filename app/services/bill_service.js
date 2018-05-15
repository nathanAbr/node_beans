let Bill =  require('../../models/bill');

function Service(){}

Service.prototype.addBill = (req, res) => {
    let bill = new Bill(req.body);
    bill.save().then(
            (doc) => {
                res.send(doc);
    });
};

Service.prototype.listInBill = (year) => {
    let result = null;
    Bill.find({
        date_prestation: {"$gte":new Date(year, 1, 1)}
    }).then((data) => {
        result = data;
    });
    return result;
};

module.exports = Service;

