/* @ngInject */
module.exports = function generatorsDashboardController($scope, $state, Todos, formUtilsService, nddAlert) {
    var self = this;

    self.isLoading = true;

    this.$onChanges = function (changes) {
        if (changes.api && changes.api.currentValue) {
            self.isLoading = false;
            self.api = angular.copy(self.api);
            self.generator = self.api.generator;
        }
    };

    this.edit = function () {
        self.isEditing = true;
    };

    this.cancel = function () {
        if (!self.isEditing) {
            $state.go('app.generators.list');
        } else {
            self.isEditing = false;
        }
    };

    this.save = function () {
        var form = self.getForm();
        if (form.$invalid) {
            formUtilsService.setDirty(form);
            formUtilsService.setTouched(form);
            return;
        }
        var generator = self.formGetData();
        self.isLoading = true;
        Todos.edit(generator).then(function () {
            self.isLoading = true;
            self.isEditing = false;
            formUtilsService.setPristine(form);
            self.api.refresh();
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