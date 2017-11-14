var generatorsModule = angular.module('generatorModule', [
    require('shared/configuration/configuration.module')    
]);

generatorsModule.factory('generatorService', require('./generators.service'));

module.exports = generatorsModule.name;