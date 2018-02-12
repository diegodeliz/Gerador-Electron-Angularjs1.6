/* @ngInject */
module.exports = function noteCreateCtrl($scope, $state, noteService, nddConfirmDialogService, formUtilsService) {
    var self = this;
    
    this.$onInit = function () {
        self.title = 'Cadastrar Nota Base';
        self.subtitle = 'Preencha os campos abaixo para para cadastrar uma nova Nota Base';
    };

    this.cancel = function () {
        $state.go('app.notes.list');
    };

    this.save = function () {
        var form = self.getForm();
        var note = self.formGetData();

        self.isLoading = true;
        noteService.create(note).then(function (response) {
            var data = response.data;
            $scope.todos = data;

            self.isLoading = false;
            nddConfirmDialogService.showDialog({
                title: 'Uma nova Nota Base foi cadastrada.',
                messageText: 'Nota Base ' + note.nome + ' cadastrado (a) com sucesso.',
                buttonConfirmText: 'Ir para Notas.',
                hideCancel: true,
                showClose: false,
                closeByDocument: false,
                closeByEscape: false
            }, function () {
                $state.go('app.notes.list');
            });
        }, function () {
            self.isLoading = false;
        });
    };
};