/* @ngInject */
module.exports = function generatorsDetailController($scope, $stateParams, $state, Todos, breadcrumbService, nddAlert, nddConfirmDialogService) {
    var self = this;

    self.tabOptions = [
        {
            state: 'app.generators.detail.dashboard',
            text: 'Dados Cadastrais'
        }
    ];

    self.$onInit = function () {
        loadData();
    };

    this.redirectToDash = function () {
        $state.go('app.generators.detail.dashboard', {
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
        }, removeGenerator);
    };

    function removeGenerator() {
        self.isLoading = true;
        Todos.delete(self.generator.id).then(function (data) {
            nddConfirmDialogService.showDialog({
                title: 'Operação realizada',
                messageText: 'Cliente excluído com sucesso !',
                buttonConfirmText: 'OK',
                hideCancel: true
            }, function () {
                $state.go('app.generators.list');
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
        Todos.getById($stateParams.id).then(onLoadSucess);
    }

    function onLoadSucess(generator) {
        self.generator = generator;
        var breadcrumb = {
            text: generator.name,
            sref: 'app.generators.detail.dashboard',
            params: {
                id: $stateParams.id
            }
        };
        self.api = {
            generator: generator,
            refresh: loadData
        };
        breadcrumbService.setOptions($scope, 'app.generators', breadcrumb);
    }
};