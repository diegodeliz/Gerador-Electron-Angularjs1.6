/* @ngInject */
module.exports = function socketCreateCtrl($scope, $state, SocketService, nddConfirmDialogService, formUtilsService) {
    var self = this;
    
    this.$onInit = function () {
        self.title = 'Cadastrar Empresa';
        self.subtitle = 'Preencha os campos abaixo para para cadastrar uma nova Empresa';
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
                title: 'Empresa foi cadastrada.',
                messageText: 'Empresa ' + socket.nome + ' cadastrado(a) com sucesso.',
                buttonConfirmText: 'Ir para Empresas.',
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