/* @ngInject */
module.exports = function customerFormController($scope) {
    var self = this;

    var Customer = require('../models/customer.model');

    self.$onInit = function () {
        self.customer = new Customer();
        self.fiscalTypes = require('../models/customers-type.model');

        self.getData = function () {
            return self.customer;
        };

        self.getForm = function () {
            return $scope.formCustomers;
        };
    };

    this.$onChanges = function (changes) {
        if (changes.customer && changes.customer.currentValue) {
            // Fazemos o copy para garantir a imutabilidade do customer
            self.customer =  angular.copy(changes.customer.currentValue);
        }
    };
};
