/* @ngInject */
module.exports = function jdbcCreateCtrl($scope, $state, JdbcsService, nddConfirmDialogService, formUtilsService) {
    var self = this;
    
    this.$onInit = function () {
        self.title = 'Cadastrar Empresa';
        self.subtitle = 'Preencha os campos abaixo para para cadastrar uma nova Empresa';
    };

    this.cancel = function () {
        $state.go('app.jdbcs.list');
    };

    this.save = function () {
        var form = self.getForm();
        var jdbc = self.formGetData();

        self.isLoading = true;
        JdbcsService.create(jdbc).then(function (response) {
            var data = response.data;
            $scope.jdbc = data;

            self.isLoading = false;
            nddConfirmDialogService.showDialog({
                title: 'Empresa foi cadastrada.',
                messageText: 'Empresa ' + jdbc.nome + ' cadastrado(a) com sucesso.',
                buttonConfirmText: 'Ir para Empresas.',
                hideCancel: true,
                showClose: false,
                closeByDocument: false,
                closeByEscape: false
            }, function () {
                $state.go('app.jdbcs.list');
            });
        }, function () {
            self.isLoading = false;
        });
    };
};