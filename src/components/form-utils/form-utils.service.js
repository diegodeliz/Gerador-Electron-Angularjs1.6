/* @ngInject */
module.exports = function () {
    this.setDirty = function (form) {
        form.$$controls.map(function (control) {
            control.$setDirty();
        });
    }

    this.setPristine = function (form) {
        form.$$controls.map(function (control) {
            control.$setPristine();
        });
    }

    this.resetForm = function (form) {
        form.$$controls.map(function (control) {
            control.$setPristine();
        });
    }

    this.onChange = function ($scope, prop, callback) {
        return $scope.$watch(prop, function (newValue, oldValue) {
            newValue !== oldValue && callback();
        }, true);
    }
}