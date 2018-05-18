const mongoose = require('mongoose');

/*
{
    name: 'Fournisseur 1',
    address:{road:'6 rue des Saphirs', zip:'44000', city:'Nantes'}
},{

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
    contacts:[{
        name: String,
        mail: {
            type: String,
            trim: true,
            lowercase: true,
            unique: false,
            validate: {
                validator(v){
                    return /^((([^<>()[\]\.,;:s@\"]+(.[^<>()[\]\.,;:s@\"']+)*))@((([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))(;(([^<>()[\]\.,;:s@\"]+(.[^<>()[\]\.,;:s@\"']+)*))@((([a-zA-Z-0-9]+.)+[a-zA-Z]{2,})))*|)$/i.test(v);
                },
                message: 'a mail format is required!'
            }
        },
        comments: [String],
        tel: {type: String,  maxlength: 10 },
        mobile: {type: String,  maxlength: 10}
    }],
    comments:[String]
})
const customerModel = mongoose.model('customer', companySchema);
const providerModel = mongoose.model('provider', companySchema);
module.exports = {customerModel: customerModel,providerModel:providerModel};