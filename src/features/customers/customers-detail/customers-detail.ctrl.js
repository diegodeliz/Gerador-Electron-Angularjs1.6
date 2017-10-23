/* @ngInject */
module.exports = function customersDetailController($scope, $stateParams, $state, customersService, breadcrumbService, nddAlert, nddConfirmDialogService) {
    var self = this;

    self.tabOptions = [
        {
            state: 'app.customers.detail.dashboard',
            text: 'Dados Cadastrais'
        }
    ];

    self.$onInit = function () {
        loadData();
    };

    this.redirectToDash = function () {
        $state.go('app.customers.detail.dashboard', {
            id: $stateParams.id,
            edit: true
        });
    };

    this.remove = function () {
        nddConfirmDialogService.showDialog({
            title: 'Confirmação de Exclusão',
            messageText: 'Deseja realmente excluir ? Essa operação não pode ser desfeita.',
            buttonConfirmText: 'Remover',
            buttonCancelText: 'Cancelar'
        }, removeCustomer);
    };

    function removeCustomer() {
        self.isLoading = true;
        customersService.removeCustomer(self.customer.id).then(function (data) {
            nddConfirmDialogService.showDialog({
                title: 'Operação realizada',
                messageText: 'Cliente excluído com sucesso !',
                buttonConfirmText: 'OK',
                hideCancel: true
            }, function () {
                $state.go('app.customers.list');
            });
        }, function () {
            self.isLoading = false;
            nddAlert.show({
                title: 'Operação não realizada',
                messageText: 'Erro ao realizar operação',
                buttonOk: 'OK'
            });
        });
    }

    function loadData() {
        customersService.getById($stateParams.id).then(onLoadSucess);
    }

    function onLoadSucess(customer) {
        self.customer = customer;
        var breadcrumb = {
            text: customer.name,
            sref: 'app.customers.detail.dashboard',
            params: {
                id: $stateParams.id
            }
        };
        self.api = {
            customer: customer,
            refresh: loadData
        };
        breadcrumbService.setOptions($scope, 'app.customers', breadcrumb);
    }
};