var generatorsModule = angular.module('Todos', [
    require('shared/configuration/configuration.module')    
]);

generatorsModule.factory('Todos', require('./generators.service'));

module.exports = generatorsModule.name;