/* @ngInject */
module.exports = function massGeneratorFormController($scope) {
    var self = this;

    var MassGenerator = require('../models/massGenerator.model');

    self.$onInit = function () {
        self.massGenerator = new MassGenerator();
        self.fiscalTypes = require('../models/massGenerator-type.model');

        self.getData = function () {
            return self.massGenerator;
        };

        self.getForm = function () {
            return $scope.formMassGenerator;
        };
    };

    this.$onChanges = function (changes) {
        if (changes.massGenerator && changes.massGenerator.currentValue) {
            // Fazemos o copy para garantir a imutabilidade do massGenerator
            self.massGenerator =  angular.copy(changes.massGenerator.currentValue);
        }
    };
};
