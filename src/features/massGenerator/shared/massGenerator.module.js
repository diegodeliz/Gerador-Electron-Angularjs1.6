var massGeneratorModule = angular.module('massGenerator', [
    require('shared/configuration/configuration.module'),
    require('ndd-query-generator')
]);

massGeneratorModule.factory('massGeneratorService', require('./massGenerator.service'));

module.exports = massGeneratorModule.name;
