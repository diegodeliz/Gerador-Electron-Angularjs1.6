/* @ngInject */
module.exports = function noteFormController($scope, $state, noteService, ngDialog, formUtilsService, nddAlert) {
    var self = this;

    var Note = require('../models/notes.model');
    var Company = require('../models/company.model');

    self.$onInit = function () {
        self.note = new Note();
        self.company = new Company();

        self.getData = function () {
            return self.note;
        };

        self.getDataCompany = function () {
            return self.company;
        };

        self.getForm = function (element) {
            return $scope.formNotes;
        };

    };

    this.$onChanges = function (changes) {
        if (changes.note && changes.note.currentValue) {
            // Fazemos o copy para garantir a imutabilidade do note
            self.note = angular.copy(changes.note.currentValue);
        }
    };

    $('#origem').on('change', function (event) {
        self.note.origem = document.getElementById("origem").files[0].path;
        if (self.note._id != undefined && self.note._id != null && self.note._id != "" ) {
            var form = self.getForm();   
            self.isLoading = true;
            noteService
            .editOrigem(self.note)
            .then(function (result) {
                self.isLoading = true;
                self.isEditing = true;
                formUtilsService.setPristine(form);
                let newData = { "_id": self.note._id, "origem": self.note.origem };
                noteService.postFile(newData);
            }, messageError);
        } else {
            let newData = { "_id": "000", "origem": self.note.origem };
            noteService.postFile(newData);
        }
    });

    function messageError() {
        self.isLoading = false;
        nddAlert.show({
            title: 'Operação não realizada',
            messageText: 'Erro ao realizar operação',
            buttonOk: 'OK'
        });
    }

    this.selectCompany = function (company) {
        self.note.ie = company.ie;
        self.note.cnpj = company.cnpj;
        self.note.empresa = company.nome;
    };

    activate();

    function activate() {
        noteService.getCompanies().then(function (data) {
            self.company = data;
            return self.company;
        });
    }

    this.btnArquivoModal = function () {
        if (!self.note._id) var item = "000"; else var item = self.note._id;
        noteService
            .getFile(item)
            .then(function (data) {
                return ngDialog.openConfirm({
                    template: '<header><i class="fa "></i><h4>Nota Base</h4></header>' +
                        '<div class="dialog-content"><p>' + '<textarea id="arquivoBase" style="height: 100%; width: 100%;" rows="18">' + data + '</textarea>' + '</p> </div>' +
                        '<div class="footer-actions row">' +
                        '<button type="button" class="btn btn-default pull-right" ng-click="confirm()">Salvar</button></div>',
                    className: 'ngdialog-theme-default modalFile',
                    plain: 'true'
                }).then(function (success) {
                    data = document.getElementById('arquivoBase').value;
                    if (self.note._id != undefined && self.note._id != null && self.note._id != "" ) {
                        let newData = { "id": self.note._id, "data": data };
                        noteService.postContent(newData);
                    } else {
                        let newData = { "id": "000", "data": data }; 
                        noteService.postContent(newData);
                    }
                });
            });
    };
};
