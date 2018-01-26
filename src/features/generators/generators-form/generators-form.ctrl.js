/* @ngInject */
module.exports = function generatorFormController($scope, generatorService, ngDialog) {
    var self = this;

    var Generator = require('../models/generators.model');
    var Company = require('../models/company.model');

    self.$onInit = function () {
        self.generator = new Generator();
        self.company = new Company();

        self.getData = function () {
            return self.generator;
        };

        self.getDataCompany = function () {
            return self.company;
        };

        self.getForm = function (element) {
            return $scope.formGenerators;
        };

    };

    self.$doCheck = function () {
        document.getElementById("destino").disabled = true;
        if (self.generator.tipoEnvio == 1)
            document.getElementById("destino").disabled = false;
    }

    $('#origem').on('change', function (event) {
        self.generator.origem = document.getElementById("origem").files[0].path;
        if (self.generator._id != undefined && self.generator._id != null) {
            generatorService
            .getFile(self.generator._id)
            .then(function (data) {
                let newData = { "id": self.generator._id, "data": data };
                generatorService.postFile(newData);
            });
        }  
    });

    //Tipo de Comunicação - Arquivo / JDBC / Socket
    $('#envioArquivo').on('change', function (event) {
        document.getElementById("destino").disabled = false;
    });

    $('#jdbc').on('change', function (event) {
        document.getElementById("destino").disabled = true;
    });

    $('#socket').on('change', function (event) {
        document.getElementById("destino").disabled = true;
    });

    this.$onChanges = function (changes) {
        if (changes.generator && changes.generator.currentValue) {
            // Fazemos o copy para garantir a imutabilidade do generator
            self.generator = angular.copy(changes.generator.currentValue);
        }
    };

    this.selectCompany = function (company) {
        self.generator.ie = company.ie;
        self.generator.cnpj = company.cnpj;
        self.generator.empresa = company.nome;
    };

    activate();

    function activate() {
        generatorService.getCompanies().then(function (data) {
            self.company = data;
            return self.company;
        });
    }

    this.btnGerarNovaSerie = function () {
        self.generator.serie = Math.floor(Math.random() * 900) + 1;
    };

    this.btnArquivoModal = function () {
        if (!self.generator._id) var item = self.generator.origem; else var item = self.generator._id;
        generatorService
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
                    let newData = { "id": self.generator._id, "data": data };
                    generatorService.postFile(newData);
                });
            });
    };
};
