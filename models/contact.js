const mongoose = require('mongoose');
/*  {
        name: 'Darth Vader',
       mail: 'darth@vader.galaxy',
       company_name: 'Vader Inc.',
       customer: 'ObjId...',
       port:'0678906543'
   },{
    name: 'Leia Solo',
    mail: 'leia.organa@solo.net',
    company_name:' Rebels Ltd.',
    provider: 'ObjId...',
    tel: '0240123456'
   }
*/
contactSchema = new mongoose.Schema({
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
    company_name: {type: String},
    customer:{type: mongoose.Schema.ObjectId, ref:'customer'},
    provider:{type: mongoose.Schema.ObjectId, ref:'provider'},
    tel: {type: String,  maxlength: 10 },
    mobile: {type: String,  maxlength: 10}
})


const contactModel = mongoose.model('contact', contactSchema);

module.exports = contactModel;