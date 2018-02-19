/* @ngInject */
module.exports = function generatorFormController($scope, generatorService) {
    var self = this;

    var Generator = require('../models/generators.model');
    var Note = require('../models/notes.model');
    var Jdbc = require('../models/jdbcs.model');
    var Socket = require('../models/sockets.model');

    self.$onInit = function () {
        self.generator = new Generator();
        self.note = new Note();
        self.jdbc = new Jdbc();
        self.socket = new Socket();

        self.getData = function () {
            return self.generator;
        };

        self.getDataNote = function () {
            return self.note;
        };

        self.getForm = function (element) {
            return $scope.formGenerators;
        };

        self.generator.serie = Math.floor(Math.random() * 900) + 1;

    };

    $scope.generator = {
        cancelamento : "YES",
        ped_ajuste : "YES"
    };

    self.$doCheck = function () {
        if (self.generator.tipoEnvio == 1) {
            document.getElementById("destino").disabled = false;
            document.getElementById("divDestino").style.display = "block";
            document.getElementById("divJdbc").style.display = "none";
            document.getElementById("divSocket").style.display = "none";
        } else if (self.generator.tipoEnvio == 2) {
            document.getElementById("divDestino").style.display = "none";
            document.getElementById("divJdbc").style.display = "block";
            document.getElementById("divSocket").style.display = "none";
        } else {
            document.getElementById("divDestino").style.display = "none";
            document.getElementById("divJdbc").style.display = "none";
            document.getElementById("divSocket").style.display = "block";
        }
    }

    //Tipo de Comunicação - Arquivo / JDBC / Socket
    $('#envioArquivo').on('change', function (e) {
        document.getElementById("divDestino").style.display = "block";
        document.getElementById("divJdbc").style.display = "none";
        document.getElementById("divSocket").style.display = "none";
    });
    $('#jdbc').on('change', function (e) {
        document.getElementById("divDestino").style.display = "none";
        document.getElementById("divJdbc").style.display = "block";
        document.getElementById("divSocket").style.display = "none";
    });
    $('#socket').on('change', function (e) {
        document.getElementById("divDestino").style.display = "none";
        document.getElementById("divJdbc").style.display = "none";
        document.getElementById("divSocket").style.display = "block";
    });

    this.$onChanges = function (changes) {
        if (changes.generator && changes.generator.currentValue)
            self.generator = angular.copy(changes.generator.currentValue);
    };

    this.selectNote = function (note) {
        self.generator.nota[0] = note;
    };

    this.selectJdbc = function (jdbc) {
        self.generator.jdbc[0] = jdbc;
    };

    this.selectSocket = function (socket) {
        self.generator.socket[0] = socket;
    };
    
    activate();

    function activate() {
        generatorService.getNote().then(function (data) {
            self.note = data;
            return self.note;
        });

        generatorService.getSocket().then(function (data) {
            self.socket = data;
            return self.socket;
        });

        generatorService.getJdbc().then(function (data) {
            self.jdbc = data;
            return self.jdbc;
        });
    }

    this.btnGerarNovaSerie = function () {
        self.generator.serie = Math.floor(Math.random() * 900) + 1;
    };

};
