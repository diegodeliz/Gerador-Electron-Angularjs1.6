/* @ngInject */
module.exports = function generatorCreateCtrl($scope, $state, generatorsService, nddConfirmDialogService, formUtilsService) {
    var self = this;
    var Generator = require('../models/generators.model');
    
    this.$onInit = function () {
        self.title = 'Cadastrar Cliente';
        self.subtitle = 'Preencha os campos abaixo para para cadastrar um novo cliente';
    };

    this.cancel = function () {
        $state.go('app.generators.list');
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
        generatorsService.addGenerator(generator).then(function () {
            self.isLoading = false;
            nddConfirmDialogService.showDialog({
                title: 'Cliente foi cadastrado.',
                messageText: 'Cliente ' + generator.name + ' cadastrado (a) com sucesso.',
                buttonConfirmText: 'Ir para clientes.',
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