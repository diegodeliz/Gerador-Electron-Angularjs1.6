var generatorsModule = angular.module('Todos', []);

generatorsModule.factory('Todos', require('./generators.service'));

module.exports = generatorsModule.name;