/* @ngInject */
module.exports = function jdbcFormController($scope) {
    var self = this;

    var Jdbc = require('../models/jdbcs.model');

    self.$onInit = function () {
        self.jdbc = new Jdbc();

        self.getData = function () {
            return self.jdbc;
        };

        self.getForm = function (element) {
            return $scope.formJdbcs;
        };

        console.log(self.jdbc.captura_retorno);

        if (self.jdbc.captura_retorno != null && self.jdbc.captura_retorno != undefined) {
            document.getElementById("apaga_saida").disabled = false;
        } else {
            document.getElementById("apaga_saida").disabled = true;
        }
    };

    $('#origem').on('change', function (event) {
        self.jdbc.origem = document.getElementById("origem").files[0].path;
    });

    $scope.jdbc = {
        captura_retorno : "YES",
        apaga_saida : "YES"
    };

    $('#captura_retorno').on('change', function (event) {
        if (self.jdbc.captura_retorno != null && self.jdbc.captura_retorno != undefined) {
            document.getElementById("apaga_saida").disabled = false;
        } else {
            document.getElementById("apaga_saida").disabled = true;
        }
    });

    this.$onChanges = function (changes) {
        if (changes.jdbc && changes.jdbc.currentValue) {
            // Fazemos o copy para garantir a imutabilidade do jdbc
            self.jdbc =  angular.copy(changes.jdbc.currentValue);
        }
    };
};
