const Provider = require('../../models/company').providerModel;

function processAddProvider(params){
    let provider = new Provider(params);
	return provider.save();
}

function processUpdateProvider(params) {
    console.log(params);
    return Provider.findByIdAndUpdate(
        params._id, {
            $set: { 
                name : params.name
                , address: params.address
                , "contacts.$[]" : params.contacts
                , tel : params.tel
                , mobile : params.mobile
            }
        }, { 
        new: true 
    });
}

function providersList() {
    return Provider.find({
    });
}

function providerSelect() {
    return Provider.find({},{name:1});
}

module.exports = {
    processAddProvider : processAddProvider,
    processUpdateProvider : processUpdateProvider,
    providersList : providersList,
    providerSelect: providerSelect
};


