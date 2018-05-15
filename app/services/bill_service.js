let Bill =  require('../../models/bill');

function listInBill(year) {
    Bill.find({
    }).then((data) => {
        return data;
    });
}

module.exports = {
    listInBill: listInBill,
};

