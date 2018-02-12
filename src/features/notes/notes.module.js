require('angular-ui-switch');

var notesModule = angular.module('notesModule', [
    require('angular-ui-router'),
    require('ndd-titlebar'),
    'uiSwitch',
    require('ndd-kendo-grid'),
    require('ndd-alert'),
    require('ng-dialog'),
    require('ndd-confirm-dialog'),
    require('ndd-breadcrumb'),
    require('components/form-utils/form-utils.module'),
    require('angular-messages'),
    require('./shared/notes.module')
]);

notesModule
    .component('noteList', require('./notes-list/notes-list.component'))
    .component('noteCreate', require('./notes-create/notes-create.component'))
    .component('noteForm', require('./notes-form/notes-form.component'))
    .component('noteDetail', require('./notes-detail/notes-detail.component'))
    .component('noteDashboard', require('./notes-dashboard/note-dashboard.component'))
    .directive('stateSelectorValidation', require('./notes-form/notes-form.directive'))    

module.exports = notesModule.name;