const Customer = require('../../models/company').customerModel;

function customersList() {
    return Customer.find({
    });
}
function customerSelect(){
    return Customer.find({},{name:1});
}

module.exports = {
    customersList : customersList,
    customerSelect: customerSelect
};


