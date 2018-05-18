const Customer = require('../../models/company').customerModel;
const mongoose = require('mongoose');

function findOneCustomer(id) {
    return Customer.find({_id: id});
}

function processAddCustomer(params){
    let customer = new Customer(params);
	return customer.save();
}

function processUpdateCustomer(params) {
    console.log('params mobile => ' + params.mobile);
    return Customer.findByIdAndUpdate(
        params._id, {
            $set: { 
                name : params.name
                , address: params.address
                , mobile : params.mobile
                , tel : params.tel
            }/*,
            $addToSet : {contacts: { $each: params.contacts}}
            */
        }, {
            multi: true
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
    findOneCustomer: findOneCustomer,
    processAddCustomer : processAddCustomer,
    processUpdateCustomer: processUpdateCustomer,
    customersList : customersList,
    getOne: getOne,
    customerSelect: customerSelect
};


