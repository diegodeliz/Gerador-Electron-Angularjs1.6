module.exports = {
    template: require('./companies-dashboard.html'),
    controller: require('./companies-dashboard.ctrl'),
    bindings: {
        api: '<'
    }
};
