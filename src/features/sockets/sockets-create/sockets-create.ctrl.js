/* @ngInject */
module.exports = function socketCreateCtrl($scope, $state, SocketService, nddConfirmDialogService, formUtilsService) {
    var self = this;
    
    this.$onInit = function () {
        self.title = 'Cadastrar Conexão Socket';
        self.subtitle = 'Preencha os campos abaixo para para cadastrar uma nova Conexão Socket';
    };

    this.cancel = function () {
        $state.go('app.sockets.list');
    };

    this.save = function () {
        var form = self.getForm();
        var socket = self.formGetData();

        self.isLoading = true;
        SocketService.create(socket).then(function (response) {
            var data = response.data;
            $scope.socket = data;

            self.isLoading = false;
            nddConfirmDialogService.showDialog({
                title: 'Conexão Socket foi cadastrada.',
                messageText: 'Conexão Socket ' + socket.nome + ' cadastrado(a) com sucesso.',
                buttonConfirmText: 'Ir para Conexão Socket.',
                hideCancel: true,
                showClose: false,
                closeByDocument: false,
                closeByEscape: false
            }, function () {
                $state.go('app.sockets.list');
            });
        }, function () {
            self.isLoading = false;
        });
    };
};