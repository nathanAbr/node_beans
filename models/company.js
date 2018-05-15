const mongoose = require('mongoose');

companySchema = new mongoose.Schema({
    name:{type:String, required:true},
    adress:{
        road:String,
        zip:String,
        city:String,
        country:String
    },
    websites:[String],
    siret: String,
    contacts:[contactSchema]
})

const providerModel = mongoose.model('provider', companySchema);
module.exports = customersModel;