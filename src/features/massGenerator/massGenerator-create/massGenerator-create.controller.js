/* @ngInject */
module.exports = function massGeneratorCreateCtrl($scope, $state, massGeneratorService, nddConfirmDialogService, formUtilsService) {
    var self = this;
    var MassGenerator = require('../models/massGenerator.model');
    
    this.$onInit = function () {
        self.title = 'Cadastrar Cliente';
        self.subtitle = 'Preencha os campos abaixo para para cadastrar um novo cliente';
    };

    this.cancel = function () {
        $state.go('app.massGenerator.list');
    };

    this.save = function () {
        var form = self.getForm();
        if (form.$invalid) {
            formUtilsService.setDirty(form);
            formUtilsService.setTouched(form);
            return;
        }
        var massGenerator = self.formGetData();
        self.isLoading = true;
        massGeneratorService.addMassGenerator(massGenerator).then(function () {
            self.isLoading = false;
            nddConfirmDialogService.showDialog({
                title: 'Cliente foi cadastrado.',
                messageText: 'Cliente ' + massGenerator.name + ' cadastrado (a) com sucesso.',
                buttonConfirmText: 'Ir para clientes.',
                hideCancel: true,
                showClose: false,
                closeByDocument: false,
                closeByEscape: false
            }, function () {
                $state.go('app.massGenerator.list');
            });
        }, function () {
            self.isLoading = false;
        });
    };
};