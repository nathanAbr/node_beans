const Bill =  require('../../models/bill'), Company = require('../../models/company').customerModel;
/*

*/

function listInBill(year) {
    /*Bill.find({
    }).then((data) => {
        console.log('listing bills: '+data);
        return data;
    });
        console.log(new Date(year, 1, 1));
    console.log(new Date(year, 12, 31));
    return Bill.find({date_prestation:{"$gte":new Date(year, 1, 1), "$lte":new Date(year, 12, 30)}});

    */
    Bill.
  find({}).
  populate('customer').
  exec(function (err, bill) {
    if (err) return console.log('err!:'+err);
    console.log('The customer for bill '+bill.libelle+' is %s', bill.customer.name);
  });

}

module.exports = {
    listInBill: listInBill,
};

