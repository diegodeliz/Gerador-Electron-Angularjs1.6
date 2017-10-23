/* @ngInject */
module.exports = function customersRoutes($stateProvider) {
    $stateProvider
        .state('app.customers', {
            url: '/customers',
            redirect: 'app.customers.list',
            template: '<ui-view></ui-view>',
            breadcrumb: 'Cliente',
            resolve: {
                lazyLoad: require('ndd-lazy!./customers.module')
            }
        })
        .state('app.customers.list', {
            url: '',
            template: '<customer-list></customer-list>'
        })
        .state('app.customers.register', {
            url: '/register',
            template: '<customer-create></customer-create>'
        })
        .state('app.customers.detail', {
            url: '/detail/:id',
            redirect: 'app.customers.detail.dashboard',
            template: '<customer-detail></customer-detail>'
        })
        .state('app.customers.detail.dashboard', {
            url: '/dashboard',
            template: '<customer-dashboard api="$ctrl.api"></customer-dashboard>'
        });
};
