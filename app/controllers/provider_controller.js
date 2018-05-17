const services = require('../services/provider_service');

function processAddProvider(req, res) {    
    let params = req.body;
    
    services.processAddProvider(params).then((err,provider)=>{
        if (err) return res.send(err);
        console.log(provider); 
        res.render('providers_view',{title:'providers',providers:provider})});
}

function processUpdateProvider(req, res) {
    let params = req.body;
    services.processUpdateProvider(params).then((err, provider) => {
    if (err) return res.send(err);
        console.log(provider); 
        res.render('providers_view',{title:'providers',providers:provider});
    });
}

function providersList(req, res) {
        services.providersList().then( (providers)=>{
            console.log(providers);
            res.render('providers_view', {title:'providers',providers:providers});
        });
}

module.exports = {
    processAddProvider : processAddProvider,
    processUpdateProvider: processUpdateProvider,
    providersList : providersList
};