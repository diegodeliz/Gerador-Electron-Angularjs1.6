module.exports = {
    template: require('./sockets-dashboard.html'),
    controller: require('./sockets-dashboard.ctrl'),
    bindings: {
        api: '<'
    }
};
