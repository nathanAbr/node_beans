let Bill =  require('../../models/bill');

function listInBill(year) {
    return Bill.find({date_prestation:{"$gte":new Date(year, 1, 1), "$lte":new Date(year, 12, 30)}});
}

module.exports = {
    listInBill: listInBill,
};

