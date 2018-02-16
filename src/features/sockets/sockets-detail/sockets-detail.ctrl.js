/* @ngInject */
module.exports = function socketsDetailController($scope, $stateParams, $state, SocketService, breadcrumbService, nddAlert, nddConfirmDialogService) {
    var self = this;

    this.$onInit = function () {
        self.title = 'Cadastrar Conexão Socket';
        self.subtitle = 'Preencha os campos abaixo para cadastrar ums novs Conexão Socket';
        loadData();
    };

    this.redirectToDash = function () {
        $state.go('app.sockets.detail.dashboard', {
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
        }, removeSocket);
    };

    function removeSocket() {
        self.isLoading = true;
        SocketService.delete(self.socket.id).then(function (data) {
            nddConfirmDialogService.showDialog({
                title: 'Operação realizada',
                messageText: 'Conexão Socket excluída com sucesso !',
                buttonConfirmText: 'OK',
                hideCancel: true
            }, function () {
                $state.go('app.sockets.list');
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
        SocketService.getById($stateParams.id).then(onLoadSucess);
    }

    function onLoadSucess(socket) {
        self.socket = socket;
        //ajustado para tratar o objeto JSON corretamente
        var socket = JSON.parse(JSON.stringify(socket[0]));
        var breadcrumb = {
            text: socket.nome,
            sref: 'app.sockets.detail.dashboard',
            params: {
                id: $stateParams.id
            }
        };
        self.api = {
            socket: socket,
            refresh: loadData
        };
        breadcrumbService.setOptions($scope, 'app.sockets', breadcrumb);
    }
};