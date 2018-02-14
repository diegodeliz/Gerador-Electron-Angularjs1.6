module.exports = {
    template: require('./jdbcs-dashboard.html'),
    controller: require('./jdbcs-dashboard.ctrl'),
    bindings: {
        api: '<'
    }
};
