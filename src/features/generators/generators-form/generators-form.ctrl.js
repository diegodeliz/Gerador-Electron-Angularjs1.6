/* @ngInject */
module.exports = function generatorFormController($scope) {
    var self = this;

    var Generator = require('../models/generators.model');

    self.$onInit = function () {
        self.generator = new Generator();

        self.getData = function () {
            return self.generator;
        };

        self.getForm = function (element) {
            return $scope.formGenerators;
        };
    };

    $('#origem').on('change', function (event) {
        self.generator.origem = document.getElementById("origem").files[0].path;
    });

    this.$onChanges = function (changes) {
        if (changes.generator && changes.generator.currentValue) {
            // Fazemos o copy para garantir a imutabilidade do generator
            self.generator =  angular.copy(changes.generator.currentValue);
        }
    };
};
