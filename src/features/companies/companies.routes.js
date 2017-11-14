/* @ngInject */
module.exports = function companiesRoutes($stateProvider) {
    $stateProvider
        .state('app.companies', {
            url: '/companies',
            redirect: 'app.companies.list',
            template: '<ui-view></ui-view>',
            breadcrumb: 'Gerador de Massa',
            resolve: {
                lazyLoad: require('ndd-lazy!./companies.module')
            }
        })
        .state('app.companies.list', {
            url: '',
            template: '<company-list></company-list>'
        })
        .state('app.companies.register', {
            url: '/register',
            template: '<company-create></company-create>'
        })
        .state('app.companies.detail', {
            url: '/detail/:id',
            redirect: 'app.companies.detail.dashboard',
            template: '<company-detail></company-detail>'
        })
        .state('app.companies.detail.dashboard', {
            url: '/dashboard',
            template: '<company-dashboard api="$ctrl.api"></company-dashboard>'
        });
};
