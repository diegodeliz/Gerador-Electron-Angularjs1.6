var layout = angular.module('layout', [
    require('components/navbar/navbar.module'),
    require('ndd-sidebar'),
    require('components/offsidebar/offsidebar.module')
]);

layout.component('layout', require('./layout.component'));

module.exports = layout.name;