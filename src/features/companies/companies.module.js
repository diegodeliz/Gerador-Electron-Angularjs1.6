require('angular-ui-switch');

var companiesModule = angular.module('companiesModule', [
    require('angular-ui-router'),
    require('ndd-titlebar'),
    'uiSwitch',
    require('ndd-kendo-grid'),
    require('ndd-alert'),
    require('ndd-confirm-dialog'),
    require('ndd-breadcrumb'),
    require('components/form-utils/form-utils.module'),
    require('angular-messages'),
    require('./shared/companies.module')
]);

companiesModule
    .component('companyList', require('./companies-list/companies-list.component'))
    .component('companyCreate', require('./companies-create/companies-create.component'))
    .component('companyForm', require('./companies-form/companies-form.component'))
    .component('companyDetail', require('./companies-detail/companies-detail.component'))
    .component('companyDashboard', require('./companies-dashboard/companies-dashboard.component'))

module.exports = companiesModule.name;