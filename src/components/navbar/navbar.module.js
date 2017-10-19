var navbar = angular.module('navbar', [
    require('ndd-dropdown'),
    require('ndd-sidebar'),
    require('ndd-breadcrumb'),
    require('angular-ui-router'),
    require('shared/configuration/configuration.module')
]);

navbar.component('navbar', require('./navbar.component'));

module.exports = navbar.name;
