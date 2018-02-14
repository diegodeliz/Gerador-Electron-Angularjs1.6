/* @ngInject */
module.exports = function socketsRoutes($stateProvider) {
    $stateProvider
        .state('app.sockets', {
            url: '/sockets',
            redirect: 'app.sockets.list',
            template: '<ui-view></ui-view>',
            breadcrumb: 'Gerador de Massa',
            resolve: {
                lazyLoad: require('ndd-lazy!./sockets.module')
            }
        })
        .state('app.sockets.list', {
            url: '',
            template: '<socket-list></socket-list>'
        })
        .state('app.sockets.register', {
            url: '/register',
            template: '<socket-create></socket-create>'
        })
        .state('app.sockets.detail', {
            url: '/detail/:id',
            redirect: 'app.sockets.detail.dashboard',
            template: '<socket-detail></socket-detail>'
        })
        .state('app.sockets.detail.dashboard', {
            url: '/dashboard',
            template: '<socket-dashboard api="$ctrl.api"></socket-dashboard>'
        });
};
