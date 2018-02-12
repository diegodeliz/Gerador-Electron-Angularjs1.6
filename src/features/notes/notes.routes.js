/* @ngInject */
module.exports = function notesRoutes($stateProvider) {
    $stateProvider
        .state('app.notes', {
            url: '/notes',
            redirect: 'app.notes.list',
            template: '<ui-view></ui-view>',
            breadcrumb: 'Gerador de Massa',
            resolve: {
                lazyLoad: require('ndd-lazy!./notes.module')
            }
        })
        .state('app.notes.list', {
            url: '',
            template: '<note-list></note-list>'
        })
        .state('app.notes.register', {
            url: '/register',
            template: '<note-create></note-create>'
        })
        .state('app.notes.detail', {
            url: '/detail/:id',
            redirect: 'app.notes.detail.dashboard',
            template: '<note-detail></note-detail>'
        })
        .state('app.notes.detail.dashboard', {
            url: '/dashboard',
            template: '<note-dashboard api="$ctrl.api"></note-dashboard>'
        });
};
