require('angular-ui-switch');

var generatorsModule = angular.module('generatorsModule', [
    require('angular-ui-router'),
    require('ndd-titlebar'),
    'uiSwitch',
    require('ndd-kendo-grid'),
    require('ndd-alert'),
    require('ndd-confirm-dialog'),
    require('ndd-breadcrumb'),
    require('components/form-utils/form-utils.module'),
    require('angular-messages'),
    require('./shared/generators.module')
]);

generatorsModule
    .component('generatorList', require('./generators-list/generators-list.component'))
    .component('generatorCreate', require('./generators-create/generators-create.component'))
    .component('generatorForm', require('./generators-form/generators-form.component'))
    .component('generatorDetail', require('./generators-detail/generators-detail.component'))
    .component('generatorDashboard', require('./generators-dashboard/generator-dashboard.component'))
    .directive('stateSelectorValidation', require('./generators-form/generators-form.directive'))    

module.exports = generatorsModule.name;