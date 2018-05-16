const services = require('../services/customer_service');

function customersList(req, res) {
        services.customersList().then( (customers)=>{
            console.log(customers);
            res.render('customers_view', {customers:customers});
        });
}

module.exports = {
    customersList : customersList
};

