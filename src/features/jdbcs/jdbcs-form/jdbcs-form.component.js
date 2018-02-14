module.exports = {
    template: require('./jdbcs-form.html'),
    controller: require('./jdbcs-form.ctrl'),
    bindings: {
        jdbc: '<',
        getData: '=?',
        getForm: '=?'
    }
};
