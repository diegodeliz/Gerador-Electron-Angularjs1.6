var offsidebar = angular.module('offsidebar', [
    require('ndd-offsidebar'),
    require('angular-ui-bootstrap/src/collapse')
]);

offsidebar.component('offsidebar', require('./offsidebar.component'));

module.exports = offsidebar.name;
