/* @ngInject */
module.exports = function generatorFormController($scope, generatorService, nddAlert) {
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

    $('#origem').on('change', function (event) {
        self.generator.origem = document.getElementById("origem").files[0].path;
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

    this.btnGerarNovaSerie = function() {
        self.generator.serie = Math.floor(Math.random() * 900) + 1;
    };

    this.btnArquivoModal =  function() {
        generatorService.getFile(self.generator._id).then(function (data) {
            nddAlert.show({
                title: "Massa de Dados",
                messageText: '<textarea style="height: 300px; width: 500px;" rows="10" cols="100"> ' + data + '</textarea>',
                buttonOk: "salvar",
                'class': "fa fa-2x fa-note",
                disableAnimation : false,
                disableEscape: false,
            });
        });
    };

};
