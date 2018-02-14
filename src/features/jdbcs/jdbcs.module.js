require('angular-ui-switch');

var jdbcsModule = angular.module('jdbcsModule', [
    require('angular-ui-router'),
    require('ndd-titlebar'),
    'uiSwitch',
    require('ndd-kendo-grid'),
    require('ndd-alert'),
    require('ndd-confirm-dialog'),
    require('ndd-breadcrumb'),
    require('components/form-utils/form-utils.module'),
    require('angular-messages'),
    require('./shared/jdbcs.module')
]);

jdbcsModule
    .component('jdbcList', require('./jdbcs-list/jdbcs-list.component'))
    .component('jdbcCreate', require('./jdbcs-create/jdbcs-create.component'))
    .component('jdbcForm', require('./jdbcs-form/jdbcs-form.component'))
    .component('jdbcDetail', require('./jdbcs-detail/jdbcs-detail.component'))
    .component('jdbcDashboard', require('./jdbcs-dashboard/jdbcs-dashboard.component'))

module.exports = jdbcsModule.name;