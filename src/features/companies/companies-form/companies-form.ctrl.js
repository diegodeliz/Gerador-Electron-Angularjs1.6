/* @ngInject */
module.exports = function companyFormController($scope) {
    var self = this;

    var Company = require('../models/companies.model');

    self.$onInit = function () {
        self.company = new Company();

        self.getData = function () {
            return self.company;
        };

        self.getForm = function (element) {
            return $scope.formCompanies;
        };
    };

    $('#origem').on('change', function (event) {
        self.company.origem = document.getElementById("origem").files[0].path;
    });

    this.$onChanges = function (changes) {
        if (changes.company && changes.company.currentValue) {
            // Fazemos o copy para garantir a imutabilidade do company
            self.company =  angular.copy(changes.company.currentValue);
        }
    };
};
