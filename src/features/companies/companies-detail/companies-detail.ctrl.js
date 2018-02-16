/* @ngInject */
module.exports = function companiesDetailController($scope, $stateParams, $state, CompaniesService, breadcrumbService, nddAlert, nddConfirmDialogService) {
    var self = this;

    this.$onInit = function () {
        self.title = 'Cadastrar Empresa';
        self.subtitle = 'Preencha os campos abaixo para cadastrar uma nova Empresa';
        loadData();
    };

    this.redirectToDash = function () {
        $state.go('app.companies.detail.dashboard', {
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
        }, removeCompany);
    };

    function removeCompany() {
        self.isLoading = true;
        CompaniesService.delete(self.company.id).then(function (data) {
            nddConfirmDialogService.showDialog({
                title: 'Operação realizada',
                messageText: 'Empresa excluída com sucesso !',
                buttonConfirmText: 'OK',
                hideCancel: true
            }, function () {
                $state.go('app.companies.list');
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
        CompaniesService.getById($stateParams.id).then(onLoadSucess);
    }

    function onLoadSucess(company) {
        self.company = company;
        //ajustado para tratar o objeto JSON corretamente
        var company = JSON.parse(JSON.stringify(company[0]));
        var breadcrumb = {
            text: company.text,
            sref: 'app.companies.detail.dashboard',
            params: {
                id: $stateParams.id
            }
        };
        self.api = {
            company: company,
            refresh: loadData
        };
        breadcrumbService.setOptions($scope, 'app.companies', breadcrumb);
    }
};