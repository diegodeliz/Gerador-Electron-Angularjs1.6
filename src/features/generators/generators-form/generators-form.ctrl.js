/* @ngInject */
module.exports = function generatorFormController($scope, generatorService) {
    var self = this;

    var Generator = require('../models/generators.model');
    var Note = require('../models/notes.model');

    self.$onInit = function () {
        self.generator = new Generator();
        self.note = new Note();

        self.getData = function () {
            return self.generator;
        };

        self.getDataNote = function () {
            return self.note;
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

    //Tipo de Comunicação - Arquivo / JDBC / Socket
    $('#envioArquivo').on('change', event => document.getElementById("destino").disabled = false);
    $('#jdbc').on('change', event => document.getElementById("destino").disabled = true);
    $('#socket').on('change', event => document.getElementById("destino").disabled = true);

    this.$onChanges = function (changes) {
        if (changes.generator && changes.generator.currentValue)
            self.generator = angular.copy(changes.generator.currentValue);
    };

    this.selectNote = function (note) {
        self.generator._idNota = note._id;
        self.generator.origem = note.origem;
        self.generator.origemName = note.origemName;
        self.generator.nota = note.nota;
        self.generator.empresa = note.nome; //pode ser empresa tambem
        self.generator.ie = note.ie;
        self.generator.cnpj = note.cnpj;
    };
    
    activate();

    function activate() {
        generatorService.getNote().then(function (data) {
            self.note = data;
            return self.note;
        });
    }

    this.btnGerarNovaSerie = function () {
        self.generator.serie = Math.floor(Math.random() * 900) + 1;
    };

};
