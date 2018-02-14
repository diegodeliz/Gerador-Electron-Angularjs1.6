/* @ngInject */
module.exports = function socketsDashboardController($scope, $state, SocketService, formUtilsService, nddAlert) {
    var self = this;

    self.isLoading = true;
    self.isEditing = true;
    
    this.$onChanges = function (changes) {
        if (changes.api && changes.api.currentValue) {
            self.isLoading = false;
            self.api = angular.copy(self.api);
            self.socket = self.api.socket;
        }
    };

    this.edit = function () {
        self.isEditing = true;
    };

    this.cancel = function () {
        if (!self.isEditing) {
            $state.go('app.sockets.list');
        } else {
            self.isEditing = false;
        }
    };

    this.save = function () {
        var form = self.getForm();

        var socket = self.formGetData();

        self.isLoading = true;
        SocketService.edit(socket).then(function () {
            self.isLoading = true;
            self.isEditing = true;
            formUtilsService.setPristine(form);
            self.api.refresh();
            $state.go('app.sockets.list');
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