module.exports = {
    template: require('./generators-form.html'),
    controller: require('./generators-form.ctrl'),
    bindings: {
        generator: '<',
        getData: '=?',
        getForm: '=?'
    }
};
