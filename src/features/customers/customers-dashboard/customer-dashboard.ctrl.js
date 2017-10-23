/* @ngInject */
module.exports = function customersDashboardController($scope, $state, customersService, formUtilsService, nddAlert) {
    var self = this;

    self.isLoading = true;

    this.$onInit = function () {
        self.fiscalTypes = require('../models/customers-type.model');
    };

    this.$onChanges = function (changes) {
        if (changes.api && changes.api.currentValue) {
            self.isLoading = false;
            self.api = angular.copy(self.api);
            self.customer = self.api.customer;
        }
    };

    this.edit = function () {
        self.isEditing = true;
    };

    this.cancel = function () {
        if (!self.isEditing) {
            $state.go('app.customers.list');
        } else {
            self.isEditing = false;
        }
    };

    this.save = function () {
        var form = self.getForm();
        if (form.$invalid) {
            formUtilsService.setDirty(form);
            formUtilsService.setTouched(form);
            return;
        }
        var customer = self.formGetData();
        self.isLoading = true;
        customersService.editCustomer(customer).then(function () {
            self.isLoading = true;
            self.isEditing = false;
            formUtilsService.setPristine(form);
            self.api.refresh();
        }, messageError);
    };

    function messageError() {
        self.isLoading = false;
        nddAlert.show({
            title: 'Operação não realizada',
            messageText: 'Erro ao realizar operação',
            buttonOk: 'OK'
        });
    }
};