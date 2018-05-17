const Customer = require('../../models/company').customerModel;
const mongoose = require('mongoose');

function processAddCustomer(params){
    let customer = new Customer(params);
	return customer.save();
}

function processUpdateCustomer(params) {
    console.log(params);
    return Customer.findByIdAndUpdate(
        params._id, {
            $set: { 
                name : params.name
                , address: params.address
                , contacts : params.contacts
                , tel : params.tel
                , mobile : params.mobile
            }
        }, { 
        new: true 
    });
}

function customersList() {
    return Customer.find({
    });
}
function customerSelect(){
    return Customer.find({},{name:1});
}

function getOne(id){
    return Customer.findById(id);
}

module.exports = {
    processAddCustomer : processAddCustomer,
    processUpdateCustomer: processUpdateCustomer,
    customersList : customersList,
    getOne: getOne,
    customerSelect: customerSelect
};


