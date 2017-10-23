var customersModule = angular.module('customers', [
    require('shared/configuration/configuration.module'),
    require('ndd-query-generator')
]);

customersModule.factory('customersService', require('./customers.service'));

module.exports = customersModule.name;
