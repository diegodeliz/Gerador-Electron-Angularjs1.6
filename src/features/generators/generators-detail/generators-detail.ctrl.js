/* @ngInject */
module.exports = function generatorsDetailController($scope, $stateParams, $state, generatorService, breadcrumbService, nddAlert, nddConfirmDialogService) {
    var self = this;

    this.$onInit = function () {
        self.title = 'Cadastrar Agente';
        self.subtitle = 'Preencha os campos abaixo para para cadastrar um novo Agente';
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
        generatorService.delete(self.generator.id).then(function (data) {
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
        generatorService.getById($stateParams.id).then(onLoadSucess);
    }

    function onLoadSucess(generator) {
        self.generator = generator;
        //ajustado para tratar o objeto JSON corretamente
        var generator = JSON.parse(JSON.stringify(generator[0]));
        var breadcrumb = {
            text: generator.text,
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