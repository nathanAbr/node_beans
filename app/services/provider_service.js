const Provider = require('../../models/company').providerModel;

function providersList() {
    return Provider.find({
    });
}

function providerSelect() {
    return Provider.find({},{name:1});
}

module.exports = {
    providersList : providersList,
    providerSelect: providerSelect
};


