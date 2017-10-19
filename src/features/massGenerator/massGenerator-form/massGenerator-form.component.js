module.exports = {
    template: require('./massGenerator-form.html'),
    controller: require('./massGenerator-form.ctrl'),
    bindings: {
        massGenerator: '<',
        getData: '=?',
        getForm: '=?'
    }
};
