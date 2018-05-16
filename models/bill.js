const mongoose = require('mongoose');

billsSchema = new mongoose.Schema({
    customer: {type: mongoose.Schema.ObjectId, ref:'customer'},
    provider: {type: mongoose.Schema.ObjectId, ref:'provider'},
    type: {type:String, enum: ['Formation', 'Dev']},
    designation: String,
    amount: {type: Number, min:[0,'Cant be neg!']},
    vat: {type:Number, min:0, max:25},
    action_date: Date,
    billing_date: {
        type: Date,
        validate: {
            validator: function(v) {
                return (v >= this.action_date || v == null)
            },
            message: 'La facture ne peut précéder la prestation...'
        }
    },
    payment_date: {
        type: Date,
        validate: {
            validator: function(v) {
                return (v >= this.billing_date || v == null)
            },
            message: 'Le réglement ne peut précéder la facture...'
        }
    },
    recovery_date: Date
})

const billsModel = mongoose.model('bills', billsSchema);

module.exports = billsModel;