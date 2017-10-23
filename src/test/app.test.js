describe('app', function () {
    var $state;
    var $stateProvider;
    var $rootScope;
    var $location;

    // Load Modules
    beforeEach(function () {
        angular.mock.module('ui.router')
        angular.mock.module(require('../app.js').name, function (_$stateProvider_) {
            $stateProvider = _$stateProvider_;

            $stateProvider
                .state('redirect', {
                    url: '/redirect',
                    template: 'Redirecionar',
                    redirect: 'stateObjetive'
                });

            $stateProvider
                .state('stateObjetive', {
                    url: '/stateObjetive',
                    template: 'stateObjetive'
                });
        });
    });

    // Injects
    beforeEach(inject(function (_$state_, _$rootScope_, _$location_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $location = _$location_;
    }));


    // Tests
    describe('redirectTest', function () {
        it("deve redirecionar para a rota especificada no redirect'", function () {
            $state.go('redirect');
            $rootScope.$apply();
            expect($state.current.name).toBe('stateObjetive');
        });

        it("deve redirecionar para a rota padrão'", function () {
            spyOn($state, "go");
            $location.path('/wrongUrl');
            $rootScope.$apply();
            expect($state.go).toHaveBeenCalledWith('app.printers.list');
        });
    });
});
