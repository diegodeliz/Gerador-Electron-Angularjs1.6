var notesModule = angular.module('noteModule', [
    require('shared/configuration/configuration.module')    
]);

notesModule.factory('noteService', require('./notes.service'));

module.exports = notesModule.name;