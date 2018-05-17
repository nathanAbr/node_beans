const services = require('../services/customer_service');

function customersList(req, res) {
        services.customersList().then( (customers)=>{
            console.log(customers);
            res.render('customers_view', {customers:customers});
        });
}

function getOne(req, res){
    console.log(req);
    // services.getOne(req.get("id")).then((customer)=>{
    //     console.log(customer);
    //     res.send(customer);
    // });
}

module.exports = {
    customersList : customersList,
    getOne: getOne,
};

