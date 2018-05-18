const services = require('../services/provider_service');

function addProvider(req,res){
    res.render('provider_add',{title:'Ajout d\'un Fournisseur'});       
}

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
        res.send(provider);
    }).catch((err)=>{
        console.log(err);
    });
}

function providersList(req, res) {
        services.providersList().then( (providers)=>{
            console.log(providers);
            res.render('providers_view', {title:'providers',providers:providers});
        });
}

module.exports = {
    addProvider: addProvider,
    processAddProvider : processAddProvider,
    processUpdateProvider: processUpdateProvider,
    providersList : providersList
};