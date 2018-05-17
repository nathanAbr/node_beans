const services = require('../services/customer_service');

function customersList(req, res) {
        services.customersList().then( (customers)=>{
            res.render('customers_view', {customers:customers});
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
    customersList : customersList,
    getOne: getOne,
};

