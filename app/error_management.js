const errors = { 
    typeError: function(var_name, type) {
        return 'The type of ' + var_name + 'is not correct, must be a ' + type;
    },
    valueError: function (var_name) {
        return 'The value of ' + var_name + 'is not correct (too small or too big)';
    }
 };

module.exports = errors;
