module.exports = {
    template: require('./sockets-form.html'),
    controller: require('./sockets-form.ctrl'),
    bindings: {
        socket: '<',
        getData: '=?',
        getForm: '=?'
    }
};
