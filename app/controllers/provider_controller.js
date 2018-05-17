const services = require('../services/provider_service');

function providersList(req, res) {
        services.providersList().then( (providers)=>{
            console.log(providers);
            res.render('providers_view', {providers:providers});
        });
}

module.exports = {
    providersList : providersList
};