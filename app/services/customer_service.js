const Customer = require('../../models/company').customerModel;
const mongoose = require('mongoose');

function customersList() {
    return Customer.find({
    });
}

function getOne(id){
    return Customer.findById(id.toString());
}

module.exports = {
    customersList : customersList,
    getOne: getOne,
};


