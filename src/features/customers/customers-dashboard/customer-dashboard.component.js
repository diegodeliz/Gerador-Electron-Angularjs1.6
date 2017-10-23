module.exports = {
    template: require('./customer-dashboard.html'),
    controller: require('./customer-dashboard.ctrl'),
    bindings: {
        api: '<'
    }
};
