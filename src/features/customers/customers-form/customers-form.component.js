module.exports = {
    template: require('./customers-form.html'),
    controller: require('./customers-form.controller'),
    bindings: {
        customer: '<',
        getData: '=?',
        getForm: '=?'
    }
};
