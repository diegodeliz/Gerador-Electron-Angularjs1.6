/* @ngInject */
module.exports = function jdbcsDetailController($scope, $stateParams, $state, JdbcsService, breadcrumbService, nddAlert, nddConfirmDialogService) {
    var self = this;

    this.$onInit = function () {
        self.title = 'Cadastrar Conexão JDBC';
        self.subtitle = 'Preencha os campos abaixo para cadastrar uma nova Conexão JDBC';
        loadData();
    };

    this.redirectToDash = function () {
        $state.go('app.jdbcs.detail.dashboard', {
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
        }, removeJdbc);
    };

    function removeJdbc() {
        self.isLoading = true;
        JdbcsService.delete(self.jdbc.id).then(function (data) {
            nddConfirmDialogService.showDialog({
                title: 'Operação realizada',
                messageText: 'Cliente excluído com sucesso !',
                buttonConfirmText: 'OK',
                hideCancel: true
            }, function () {
                $state.go('app.jdbcs.list');
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
        JdbcsService.getById($stateParams.id).then(onLoadSucess);
    }

    function onLoadSucess(jdbc) {
        self.jdbc = jdbc;
        //ajustado para tratar o objeto JSON corretamente
        var jdbc = JSON.parse(JSON.stringify(jdbc[0]));
        var breadcrumb = {
            text: jdbc.nome,
            sref: 'app.jdbcs.detail.dashboard',
            params: {
                id: $stateParams.id
            }
        };
        self.api = {
            jdbc: jdbc,
            refresh: loadData
        };
        breadcrumbService.setOptions($scope, 'app.jdbcs', breadcrumb);
    }
};