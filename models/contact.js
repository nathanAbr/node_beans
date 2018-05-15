const mongoose = require('mongoose');

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
    tel: {type: String,  maxlength: 10 },
    mobile: {type: String,  maxlength: 10}
})


const customersModel = mongoose.model('customer', companySchema);

module.exports = customersModel;