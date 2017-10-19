/* @ngInject */
module.exports = function ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.redirect) {
            event.preventDefault();
            $state.go(toState.redirect, toParams);
        }
    });
};