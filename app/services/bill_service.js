let Bill =  require('../../models/bill');

function listInBill(year) {
    Bill.find({
    }).then((data) => {
        console.log('listing bills: '+data);
        return data;
    });
}

module.exports = {
    listInBill: listInBill,
};

