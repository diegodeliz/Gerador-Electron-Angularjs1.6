require('angular-ui-switch')

var customersModule = angular.module("customersModule", [
    require('angular-ui-router'),
    require('ndd-titlebar'),
    'uiSwitch',
    require('ndd-kendo-grid'),
    require('ndd-alert'),
    require('ndd-confirm-dialog'),
    require('ndd-breadcrumb'),
    require('components/form-utils/form-utils.module'),
    require('angular-messages'),
    require('./shared/customers.module')
]);
customersModule
    .component("customersList", require("./customers-list/customers-list.component"))
    .component('customersCreate', require('./customers-create/customers-create.component'))
    .component('customersForm', require('./customers-form/customers-form.component'))
    .component('customerDetail', require('./customers-detail/customers-detail.component'))
    .component('customerDashboard', require('./customers-dashboard/customer-dashboard.component'))

module.exports = customersModule.name;