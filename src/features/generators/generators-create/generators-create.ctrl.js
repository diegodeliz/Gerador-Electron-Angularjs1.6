/* @ngInject */
module.exports = function generatorCreateCtrl($scope, $state, generatorService, nddConfirmDialogService, formUtilsService) {
    var self = this;
    
    this.$onInit = function () {
        self.title = 'Cadastrar Agente';
        self.subtitle = 'Preencha os campos abaixo para para cadastrar um novo Agente';
    };

    this.cancel = function () {
        $state.go('app.generators.list');
    };

    this.save = function () {
        var form = self.getForm();
        var generator = self.formGetData();

        self.isLoading = true;
        generatorService.create(generator).then(function (response) {
            var data = response.data;
            $scope.todos = data;

            self.isLoading = false;
            nddConfirmDialogService.showDialog({
                title: 'Agente foi cadastrado.',
                messageText: 'Agente ' + generator.text + ' cadastrado (a) com sucesso.',
                buttonConfirmText: 'Ir para Agentes.',
                hideCancel: true,
                showClose: false,
                closeByDocument: false,
                closeByEscape: false
            }, function () {
                $state.go('app.generators.list');
            });
        }, function () {
            self.isLoading = false;
        });
    };
};