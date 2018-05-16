const Bill =  require('../../models/bill'), Company = require('../../models/company').customerModel;
/*

*/

function listInBill(year) {
    /*Bill.find({
    }).then((data) => {
        console.log('listing bills: '+data);
        return data;
    });*/
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

