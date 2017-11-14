module.exports = {
    template: require('./companies-form.html'),
    controller: require('./companies-form.ctrl'),
    bindings: {
        company: '<',
        getData: '=?',
        getForm: '=?'
    }
};
