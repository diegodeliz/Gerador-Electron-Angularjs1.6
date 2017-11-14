/* @ngInject */
module.exports = function companyCreateCtrl($scope, $state, CompaniesService, nddConfirmDialogService, formUtilsService) {
    var self = this;
    
    this.$onInit = function () {
        self.title = 'Cadastrar Empresa';
        self.subtitle = 'Preencha os campos abaixo para para cadastrar uma nova Empresa';
    };

    this.cancel = function () {
        $state.go('app.companies.list');
    };

    this.save = function () {
        var form = self.getForm();
        var company = self.formGetData();

        self.isLoading = true;
        CompaniesService.create(company).then(function (response) {
            var data = response.data;
            $scope.company = data;

            self.isLoading = false;
            nddConfirmDialogService.showDialog({
                title: 'Empresa foi cadastrada.',
                messageText: 'Empresa ' + company.nome + ' cadastrado(a) com sucesso.',
                buttonConfirmText: 'Ir para Empresas.',
                hideCancel: true,
                showClose: false,
                closeByDocument: false,
                closeByEscape: false
            }, function () {
                $state.go('app.companies.list');
            });
        }, function () {
            self.isLoading = false;
        });
    };
};