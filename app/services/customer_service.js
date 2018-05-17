const Customer = require('../../models/company').customerModel;

function processAddCustomer(params){
    let customer = new Customer(params);
	return customer.save();
}

function processUpdateCustomer(params) {
    return Customer.findByIdAndUpdate(
        params.id, { 
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

module.exports = {
    processAddCustomer : processAddCustomer,
    processUpdateCustomer: processUpdateCustomer,
    customersList : customersList,
    customerSelect: customerSelect
};


