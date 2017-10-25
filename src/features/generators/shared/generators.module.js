var generatorsModule = angular.module('generators', [
    require('shared/configuration/configuration.module'),
    require('ndd-query-generator')
]);

generatorsModule.factory('generatorsService', require('./generators.service'));

module.exports = generatorsModule.name;
