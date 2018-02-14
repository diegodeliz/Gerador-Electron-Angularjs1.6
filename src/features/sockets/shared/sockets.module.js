var socketsModule = angular.module('SocketModule', [
    require('shared/configuration/configuration.module')    
]);

socketsModule.factory('SocketService', require('./sockets.service'));

module.exports = socketsModule.name;