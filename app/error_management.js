const errorHandler = { 
    typeError: function(var_name, type) {
        return 'The type of ' + var_name + 'is not correct, must be a ' + type;
    },
    valueError: function (var_name) {
        return 'The value of ' + var_name + 'is not correct (too small or too big)';
    }
    
 };

    
function verifyValues(req) {
    
    if(req.body.type !== 'Formation' && req.body.type !== 'Dev') {
        return errorHandler.valueError('bill service type');
    }
    
    if(typeof req.body.designation !== 'string') {
        return errorHandler.typeError('bill label', 'string');
    }
    
    if(typeof req.body.amount !== 'number') {
        return errorHandler.typeError('bill amount', 'number');
    }
    
    if(req.body.amount < 0) {
        return errorHandler.valueError('bill amount');
    }
    
    if(typeof req.body.vat !== 'number') {
        return errorHandler.typeError('bill tva', 'number');
    }
    
    if(req.body.vat < 0 || req.body.vat > 25) {
        return errorHandler.valueError('bill tva');
    }
    
    if(typeof req.body.action_date !== 'object') {
        return errorHandler.typeError('bill service date', 'object');
    }
    
    if(typeof req.body.billing_date !== 'string') {
        return errorHandler.typeError('bill date', 'object');
    }
    
    if(req.body.billing_date < req.body.action_date) {
        return errorHandler.valueError('bill date');
    }
    
    if(typeof req.body.payment_date !== 'string') {
        return errorHandler.typeError('bill payment date', 'object');
    }
    
    if(req.body.payment_date < req.body.billing_date) {
        return errorHandler.valueError('bill payment date');
    }
    
    if(typeof req.body.recovery_date !== 'string') {
        return errorHandler.typeError('bill reflation date', 'object');
    }
    
    return '';
}
    

module.exports = errorHandler;
