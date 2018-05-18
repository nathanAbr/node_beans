const services = require('../services/customer_service');

function addCustomer(req,res){
    res.render('customer_add',{title:'Ajout d\'un client'});       
}

function processAddCustomer(req, res) {    
    let params = req.body;
    
    services.processAddCustomer(params).then((err,customer)=>{
        if (err) return res.send(err);
        console.log(customer); 
        res.render('customers_view',{title:'customers',customers:customer})});
}

function processUpdateCustomer(req, res) {
    let params = req.body;
    services.processUpdateCustomer(params).then((err, customer) => {
    if (err) return res.send(err);
        res.send(customer);
    }).catch((err)=>{
        console.log(err);
    });
}

function customersList(req, res) {
        services.customersList().then( (customers)=>{
            res.render('customers_view', {title:'customers',customers:customers});
        });
}

function getOne(req, res){
    services.getOne(req.params.id).then((customer)=>{
        res.send(customer);
    }).catch((err)=>{
        console.log(err);
    });
}

module.exports = {
    addCustomer : addCustomer,
    processAddCustomer : processAddCustomer,
    processUpdateCustomer : processUpdateCustomer,
    customersList : customersList,
    getOne: getOne
};

