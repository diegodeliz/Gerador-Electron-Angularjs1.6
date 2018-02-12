/* @ngInject */
module.exports = function notesDashboardController($scope, $state, noteService, formUtilsService, nddAlert) {
    var self = this;

    self.isLoading = true;
    self.isEditing = true;
    
    this.$onChanges = function (changes) {
        if (changes.api && changes.api.currentValue) {
            self.isLoading = false;
            self.api = angular.copy(self.api);
            self.note = self.api.note;
        }
    };

    this.edit = function () {
        self.isEditing = true;
    };

    this.cancel = function () {
        if (!self.isEditing) {
            $state.go('app.notes.list');
        } else {
            self.isEditing = false;
        }
    };

    this.save = function () {
        var form = self.getForm();

        var note = self.formGetData();

        self.isLoading = true;
        noteService.edit(note).then(function () {
            self.isLoading = true;
            self.isEditing = true;
            formUtilsService.setPristine(form);
            self.api.refresh();
            $state.go('app.notes.list');
        }, messageError);
    };

    function messageError() {
        self.isLoading = false;
        nddAlert.show({
            title: 'Operação não realizada',
            messageText: 'Erro ao realizar operação',
            buttonOk: 'OK'
        });
    }
};