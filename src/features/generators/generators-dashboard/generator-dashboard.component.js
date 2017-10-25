module.exports = {
    template: require('./generator-dashboard.html'),
    controller: require('./generator-dashboard.ctrl'),
    bindings: {
        api: '<'
    }
};
