module.exports = {
    template: require('./notes-form.html'),
    controller: require('./notes-form.ctrl'),
    bindings: {
        note: '<',
        getData: '=?',
        getForm: '=?'
    }
};