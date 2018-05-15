const mongoose = require('mongoose');

billsSchema = new mongoose.Schema({
    client: {type: mongoose.Schema.ObjectId, ref:'customer'},
    type_prestation: {type:String, enum: ['Formation', 'Dev']},
    libelle: String,
    montant: {type: Number, min:[0,'Cant be neg!']},
    tva: {type:Number, min:0, max:25},
    date_prestation: Date,
    date_facture: {
        type: Date,
        validate: {
            validator: function(v) {
                return (v >= this.date_prestation || v == null)
            },
            message: 'La facture ne peut précéder la prestation...'
        }
    },
    date_reglement: {
        type: Date,
        validate: {
            validator: function(v) {
                return (v >= this.date_facture || v == null)
            },
            message: 'Le réglement ne peut précéder la facture...'
        }
    },
    date_relance: Date
})

const billsModel = mongoose.model('bill', billsSchema);

module.exports = billsModel;