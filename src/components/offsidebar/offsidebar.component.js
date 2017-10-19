module.exports = {
    template: require('./offsidebar.html'),
    controller: require('./offsidebar.ctrl.js'),
    bindings: {
        options: '<',
        toggleOffsidebar: '<'
    }
};
