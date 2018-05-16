const mongoose = require('mongoose');

/*
[
{ "customer":"5afbd9f638f6fda42860516b",
  "type": "Dev",
  "designation": "Last year",
  "amount": 1100,
  "vat": 20,
  "action_date": "04.30.2017",
  "billing_date": "05.01.2018"
},
{ "customer":"ObjectId...",
  "type": "Dev",
  "designation": "Renfort Node js avril",
  "amount": 1800,
  "vat": 20,
  "action_date": "04.30.2018",
  "billing_date": "05.01.2018"
},
{ 
  "customer":"ObjectId...",
  "type": "Formation",
  "designation": "Mongo mai",
  "amount": 1800,
  "action_date": "18.05.2018"
},
{ "customer":"ObjectId...",
  "type": "Dev",
  "designation": "Appli Livraisons Mars",
  "amount": 1432,
  "vat": 20,
  "action_date": "04.01.2018",
  "billing_date": "04.03.2018",
  "payment_date": "05.02.2018"
},
{ "customer":"ObjectId...",
  "type": "Formation",
  "designation": "JavaScript POE 22",
  "amount": 1800,
  "action_date": "03.02.2018",
  "billing_date": "03.03.2018",
  "recovery_date": "04.03.2018",
  "payment_date": "05.12.2018"
},
{ "customer":"ObjectId...",
  "type": "Formation",
  "designation": "JavaScript POE 21",
  "amount": 1800,
  "action_date": "03.02.2018",
  "billing_date": "03.03.2018",
  "recovery_date":"04.03.2018"
}]

*/

billsSchema = new mongoose.Schema({
    customer: {type: mongoose.Schema.ObjectId, ref:'customer'},
    type: {type:String, enum: ['Formation', 'Dev']},
    designation: String,
    amount: {type: Number, min:[0,'Cant be neg!']},
    vat: {type:Number, min:0, max:25},
    action_date: Date,
    billing_date: {
        type: Date,
        validate: {
            validator: function(v) {
                return (v >= this.date_prestation || v == null)
            },
            message: 'La facture ne peut précéder la prestation...'
        }
    },
    payment_date: {
        type: Date,
        validate: {
            validator: function(v) {
                return (v >= this.date_facture || v == null)
            },
            message: 'Le réglement ne peut précéder la facture...'
        }
    },
    recovery_date: Date
})

const billsModel = mongoose.model('bills', billsSchema);

module.exports = billsModel;