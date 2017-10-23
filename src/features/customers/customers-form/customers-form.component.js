module.exports = {
    template: require('./customers-form.html'),
    controller: require('./customers-form.ctrl'),
    bindings: {
        customer: '<',
        getData: '=?',
        getForm: '=?'
    }
};
