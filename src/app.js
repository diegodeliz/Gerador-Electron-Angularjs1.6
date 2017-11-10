require('expose?jQuery!expose?$!jquery');
require('./shared/polyfill/jquery-2.polyfill');

var angular = require('angular');
require('angular-loading-bar');
require('bootstrap');
require('materialize-css');

require('angular-i18n/angular-locale_pt-br');

var app = angular.module('app', [
    'cfp.loadingBar',
    'ngLocale',
    require('oclazyload'),
    require('angular-ui-router'),
    require('shared/configuration/configuration.module.js')
]);

// Configurações padrão da aplicação
app.config(require('./app.config'));

app.run(require('./app.run'));

// Pega todos os arquivos terminados em routes.js
// dentro da pasta app ou sub-pastas e os executa
// na etapa de configuração.
// É necessário para o lazyload funcionar.
var req = require.context('./', true, /routes.js$/);
req.keys().forEach(function (file) {
    app.config(req(file));
});

// Adicionamos o kendo em um chunk separado para otimizar o desempenho da aplicação.
require.ensure([], function () {
    require('ndd-kendo/vendor/styles/web/kendo.common-office365.less');
    require('ndd-kendo/vendor/styles/web/kendo.office365.less');
}, 'kendoThemes');

// Obtém todos os arquivos terminados em .scss
require.ensure([], function (require) {
    var req = require.context('./', true, /\.scss$/);
    req.keys().forEach(function (file) {
        req(file);
    });
}, 'defaultTheme');

module.exports = app;