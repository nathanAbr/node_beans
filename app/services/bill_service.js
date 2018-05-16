let Bill =  require('../../models/bill');

function listInBill(year) {
    console.log(new Date(year, 1, 1));
    console.log(new Date(year, 12, 31));
    return Bill.find({date_prestation:{"$gte":new Date(year, 1, 1), "$lte":new Date(year, 12, 30)}});
}
// Create a bill
function add(req,res){
    let bill = new Bill(req.body);
	bill.save().then((doc)=>{res.send(doc);});
}

module.exports = {
    listInBill: listInBill,
    add : add
};

