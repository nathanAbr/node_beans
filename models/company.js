const mongoose = require('mongoose');
const contactSchema = require('../models/contact');

/*
{
    name: 'Ecole du Code',
    address:{road:'6 rue des Pommes', zip:'44000', city:'Nantes'},    
    contacts:['ObjectId1', 'ObjectId2']
},{
    name: 'Société de Logistique',
    address:{road:'4 rue du Pont', zip: '44800', city: 'Saint-Herblain'}
}
*/

companySchema = new mongoose.Schema({
    name:{type:String, required:true},
    address:{
        road:String,
        zip:String,
        city:String,
        country:String
    },
    contacts:[contactSchema]
})
const customerModel = mongoose.model('customer', companySchema);
const providerModel = mongoose.model('provider', companySchema);
module.exports = {customerModel: customerModel,providerModel:providerModel};