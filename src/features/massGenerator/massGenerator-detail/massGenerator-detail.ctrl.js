/* @ngInject */
module.exports = function massGeneratorDetailController($scope, $stateParams, $state, massGeneratorService, breadcrumbService, nddAlert, nddConfirmDialogService) {
    var self = this;

    self.tabOptions = [
        {
            state: 'app.massGenerator.detail.dashboard',
            text: 'Dados Cadastrais'
        }
    ];

    self.$onInit = function () {
        loadData();
    };

    this.redirectToDash = function () {
        $state.go('app.massGenerator.detail.dashboard', {
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
        }, removemassGenerator);
    };

    function removemassGenerator() {
        self.isLoading = true;
        massGeneratorService.removemassGenerator(self.massGenerator.id).then(function (data) {
            nddConfirmDialogService.showDialog({
                title: 'Operação realizada',
                messageText: 'Cliente excluído com sucesso !',
                buttonConfirmText: 'OK',
                hideCancel: true
            }, function () {
                $state.go('app.massGenerator.list');
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
        massGeneratorService.getById($stateParams.id).then(onLoadSucess);
    }

    function onLoadSucess(massGenerator) {
        self.massGenerator = massGenerator;
        var breadcrumb = {
            text: massGenerator.name,
            sref: 'app.massGenerator.detail.dashboard',
            params: {
                id: $stateParams.id
            }
        };
        self.api = {
            massGenerator: massGenerator,
            refresh: loadData
        };
        breadcrumbService.setOptions($scope, 'app.massGenerator', breadcrumb);
    }
};