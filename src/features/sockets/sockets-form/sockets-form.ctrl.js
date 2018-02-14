/* @ngInject */
module.exports = function socketFormController($scope) {
    var self = this;

    var Socket = require('../models/sockets.model');

    self.$onInit = function () {
        self.socket = new Socket();

        self.getData = function () {
            return self.socket;
        };

        self.getForm = function (element) {
            return $scope.formSocket;
        };
    };

    $('#origem').on('change', function (event) {
        self.socket.origem = document.getElementById("origem").files[0].path;
    });

    this.$onChanges = function (changes) {
        if (changes.socket && changes.socket.currentValue) {
            // Fazemos o copy para garantir a imutabilidade do socket
            self.socket =  angular.copy(changes.socket.currentValue);
        }
    };
};
