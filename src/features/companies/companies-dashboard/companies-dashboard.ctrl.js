/* @ngInject */
module.exports = function companiesDashboardController($scope, $state, CompaniesService, formUtilsService, nddAlert) {
    var self = this;

    self.isLoading = true;
    self.isEditing = true;
    
    this.$onChanges = function (changes) {
        if (changes.api && changes.api.currentValue) {
            self.isLoading = false;
            self.api = angular.copy(self.api);
            self.company = self.api.company;
        }
    };

    this.edit = function () {
        self.isEditing = true;
    };

    this.cancel = function () {
        if (!self.isEditing) {
            $state.go('app.companies.list');
        } else {
            self.isEditing = false;
        }
    };

    this.save = function () {
        var form = self.getForm();

        var company = self.formGetData();

        self.isLoading = true;
        CompaniesService.edit(company).then(function () {
            self.isLoading = true;
            self.isEditing = true;
            formUtilsService.setPristine(form);
            self.api.refresh();
            $state.go('app.companies.list');
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