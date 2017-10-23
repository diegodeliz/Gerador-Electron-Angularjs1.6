/* @ngInject */
module.exports = function customerCreateCtrl($scope, $state, customersService, nddConfirmDialogService, formUtilsService) {
    var self = this;
    var Customer = require('../models/customer.model');
    
    this.$onInit = function () {
        self.title = 'Cadastrar Cliente';
        self.subtitle = 'Preencha os campos abaixo para para cadastrar um novo cliente';
    };

    this.cancel = function () {
        $state.go('app.customers.list');
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
        customersService.addCustomer(customer).then(function () {
            self.isLoading = false;
            nddConfirmDialogService.showDialog({
                title: 'Cliente foi cadastrado.',
                messageText: 'Cliente ' + customer.name + ' cadastrado (a) com sucesso.',
                buttonConfirmText: 'Ir para clientes.',
                hideCancel: true,
                showClose: false,
                closeByDocument: false,
                closeByEscape: false
            }, function () {
                $state.go('app.customers.list');
            });
        }, function () {
            self.isLoading = false;
        });
    };
};