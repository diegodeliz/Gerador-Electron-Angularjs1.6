var companiesModule = angular.module('CompaniesModule', [
    require('shared/configuration/configuration.module')    
]);

companiesModule.factory('CompaniesService', require('./companies.service'));

module.exports = companiesModule.name;