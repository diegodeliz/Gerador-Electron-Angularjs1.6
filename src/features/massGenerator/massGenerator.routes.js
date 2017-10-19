/* @ngInject */
module.exports = function massGeneratorRoutes($stateProvider) {
    $stateProvider
        .state('app.massGenerator', {
            url: '/massGenerator',
            redirect: 'app.massGenerator.list',
            template: '<ui-view></ui-view>',
            breadcrumb: 'Gerador de Massa',
            resolve: {
                lazyLoad: require('ndd-lazy!./massGenerator.module')
            }
        })
        .state('app.massGenerator.list', {
            url: '',
            template: '<massGenerator-list></massGenerator-list>'
        })
        .state('app.massGenerator.register', {
            url: '/register',
            template: '<massGenerator-create></massGenerator-create>'
        })
        .state('app.massGenerator.detail', {
            url: '/detail/:id',
            redirect: 'app.massGenerator.detail.dashboard',
            template: '<massGenerator-detail></massGenerator-detail>'
        })
        .state('app.massGenerator.detail.dashboard', {
            url: '/dashboard',
            template: '<massGenerator-dashboard api="$ctrl.api"></massGenerator-dashboard>'
        });
};
