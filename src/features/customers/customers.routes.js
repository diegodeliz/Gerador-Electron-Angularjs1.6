/*@ngInject*/
module.exports = function customersRoutes($stateProvider){
    $stateProvider.state('app.customers',{
        url: '/customers',
        template: '<ui-view></ui-view>',
        redirect: 'app.customers.list',
        resolve: {
            lazyLoad: require("ndd-lazy-loader!./customers.module.js")
        }
    })
    .state('app.customers.list',{
        url: '/list',
        template: '<customers-list></customers-list>'
    })
    .state('app.customers.create', {
        url: '/create',
        template: '<customers-create></customers-create>'
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