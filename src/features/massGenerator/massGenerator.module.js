require('angular-ui-switch');

var massGeneratorModule = angular.module('massGeneratorModule', [
    require('angular-ui-router'),
    require('ndd-titlebar'),
    'uiSwitch',
    require('ndd-kendo-grid'),
    require('ndd-alert'),
    require('ndd-confirm-dialog'),
    require('ndd-breadcrumb'),
    require('components/form-utils/form-utils.module'),
    require('angular-messages'),
    require('./shared/massGenerator.module')
]);

massGeneratorModule
    .component('massGeneratorList', require('./massGenerator-list/massGenerator-list.component'))
    .component('massGeneratorCreate', require('./massGenerator-create/massGenerator-create.component'))
    .component('massGeneratorForm', require('./massGenerator-form/massGenerator-form.component'))
    .component('massGeneratorDetail', require('./massGenerator-detail/massGenerator-detail.component'))
    .component('massGeneratorDashboard', require('./massGenerator-dashboard/massGenerator-dashboard.component'))

module.exports = massGeneratorModule.name;