var configurationModule = angular.module('configuration', []);

configurationModule.constant('appConfig', require('./configuration.value.js'));

module.exports = configurationModule.name;