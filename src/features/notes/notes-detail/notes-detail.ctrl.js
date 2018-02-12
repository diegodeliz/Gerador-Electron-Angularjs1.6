/* @ngInject */
module.exports = function notesDetailController($scope, $stateParams, $state, noteService, breadcrumbService, nddAlert, nddConfirmDialogService) {
    var self = this;

    this.$onInit = function () {
        self.title = 'Cadastrar Nota Base';
        self.subtitle = 'Preencha os campos abaixo para para cadastrar uma nova Nota Base';
        loadData();
    };

    this.redirectToDash = function () {
        $state.go('app.notes.detail.dashboard', {
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
        }, removeNote);
    };

    function removeNote() {
        self.isLoading = true;
        noteService.delete(self.note.id).then(function (data) {
            nddConfirmDialogService.showDialog({
                title: 'Operação realizada',
                messageText: 'Nota Base excluída com sucesso !',
                buttonConfirmText: 'OK',
                hideCancel: true
            }, function () {
                $state.go('app.notes.list');
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
        noteService.getById($stateParams.id).then(onLoadSucess);
    }

    function onLoadSucess(note) {
        self.note = note;
        //ajustado para tratar o objeto JSON corretamente
        var note = JSON.parse(JSON.stringify(note[0]));
        var breadcrumb = {
            text: note.text,
            sref: 'app.notes.detail.dashboard',
            params: {
                id: $stateParams.id
            }
        };
        self.api = {
            note: note,
            refresh: loadData
        };
        breadcrumbService.setOptions($scope, 'app.notes', breadcrumb);
    }
};