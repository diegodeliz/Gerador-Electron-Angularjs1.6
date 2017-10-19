module.exports = {
    template: require('./massGenerator-dashboard.html'),
    controller: require('./massGenerator-dashboard.ctrl'),
    bindings: {
        api: '<'
    }
};
