/* @ngInject */
module.exports = function jdbcsRoutes($stateProvider) {
    $stateProvider
        .state('app.jdbcs', {
            url: '/jdbcs',
            redirect: 'app.jdbcs.list',
            template: '<ui-view></ui-view>',
            breadcrumb: 'Gerador de Massa',
            resolve: {
                lazyLoad: require('ndd-lazy!./jdbcs.module')
            }
        })
        .state('app.jdbcs.list', {
            url: '',
            template: '<jdbc-list></jdbc-list>'
        })
        .state('app.jdbcs.register', {
            url: '/register',
            template: '<jdbc-create></jdbc-create>'
        })
        .state('app.jdbcs.detail', {
            url: '/detail/:id',
            redirect: 'app.jdbcs.detail.dashboard',
            template: '<jdbc-detail></jdbc-detail>'
        })
        .state('app.jdbcs.detail.dashboard', {
            url: '/dashboard',
            template: '<jdbc-dashboard api="$ctrl.api"></jdbc-dashboard>'
        });
};
