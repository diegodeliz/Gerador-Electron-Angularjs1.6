var formUtilsModule = angular.module('formUtilsModule', []);

formUtilsModule.service('formUtilsService', require('./form-utils.service'));

module.exports = formUtilsModule.name;
