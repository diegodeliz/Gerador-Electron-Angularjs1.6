require('angular-ui-switch');

var socketsModule = angular.module('socketsModule', [
    require('angular-ui-router'),
    require('ndd-titlebar'),
    'uiSwitch',
    require('ndd-kendo-grid'),
    require('ndd-alert'),
    require('ndd-confirm-dialog'),
    require('ndd-breadcrumb'),
    require('components/form-utils/form-utils.module'),
    require('angular-messages'),
    require('./shared/sockets.module')
]);

socketsModule
    .component('socketList', require('./sockets-list/sockets-list.component'))
    .component('socketCreate', require('./sockets-create/sockets-create.component'))
    .component('socketForm', require('./sockets-form/sockets-form.component'))
    .component('socketDetail', require('./sockets-detail/sockets-detail.component'))
    .component('socketDashboard', require('./sockets-dashboard/sockets-dashboard.component'))

module.exports = socketsModule.name;