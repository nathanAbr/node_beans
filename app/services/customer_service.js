const Customer = require('../../models/company').customerModel;
const mongoose = require('mongoose');

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
    customersList : customersList,
    getOne: getOne,
    customerSelect: customerSelect
};


