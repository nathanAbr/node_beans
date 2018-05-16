const Customer = require('../../models/company').customerModel;

function customersList() {
    return Customer.find({
    });
}

module.exports = {
    customersList : customersList
};


