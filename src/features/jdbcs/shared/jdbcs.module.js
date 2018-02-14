var jdbcsModule = angular.module('JdbcsModule', [
    require('shared/configuration/configuration.module')    
]);

jdbcsModule.factory('JdbcsService', require('./jdbcs.service'));

module.exports = jdbcsModule.name;