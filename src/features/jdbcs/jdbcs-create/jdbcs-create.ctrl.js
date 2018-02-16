/* @ngInject */
module.exports = function jdbcCreateCtrl($scope, $state, JdbcsService, nddConfirmDialogService, formUtilsService) {
    var self = this;
    
    this.$onInit = function () {
        self.title = 'Cadastrar Conexão JDBC';
        self.subtitle = 'Preencha os campos abaixo para cadastrar uma nova Conexão JDBC';
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
                title: 'Conexão JDBC foi cadastrada.',
                messageText: 'Conexão JDBC ' + jdbc.nome + ' cadastrado(a) com sucesso.',
                buttonConfirmText: 'Ir para Conexão JDBC.',
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