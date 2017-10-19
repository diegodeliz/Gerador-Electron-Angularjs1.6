/* @ngInject */
module.exports = function massGeneratorCreateCtrl($scope, $state, massGeneratorService, nddConfirmDialogService, formUtilsService) {
    var self = this;
    var massGenerator = require('../models/massGenerator.model');
    
    this.$onInit = function () {
        self.title = 'Cadastrar Gerador de Massa';
        self.subtitle = 'Preencha os campos abaixo para para cadastrar um novo Gerador de Massa';
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
        massGeneratorService.addmassGenerator(massGenerator).then(function () {
            self.isLoading = false;
            nddConfirmDialogService.showDialog({
                title: 'Gerador de Massa foi cadastrado.',
                messageText: 'Gerador de Massa ' + massGenerator.name + ' cadastrado (a) com sucesso.',
                buttonConfirmText: 'Ir para Gerador de Massas.',
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