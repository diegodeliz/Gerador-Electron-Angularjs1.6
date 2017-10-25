/* @ngInject */
module.exports = function generatorsRoutes($stateProvider) {
    $stateProvider
        .state('app.generators', {
            url: '/generators',
            redirect: 'app.generators.list',
            template: '<ui-view></ui-view>',
            breadcrumb: 'Gerador de Massa',
            resolve: {
                lazyLoad: require('ndd-lazy!./generators.module')
            }
        })
        .state('app.generators.list', {
            url: '',
            template: '<generator-list></generator-list>'
        })
        .state('app.generators.register', {
            url: '/register',
            template: '<generator-create></generator-create>'
        })
        .state('app.generators.detail', {
            url: '/detail/:id',
            redirect: 'app.generators.detail.dashboard',
            template: '<generator-detail></generator-detail>'
        })
        .state('app.generators.detail.dashboard', {
            url: '/dashboard',
            template: '<generator-dashboard api="$ctrl.api"></generator-dashboard>'
        });
};
