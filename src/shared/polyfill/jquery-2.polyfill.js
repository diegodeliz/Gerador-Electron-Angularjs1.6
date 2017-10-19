/*
 *  Polyfill para código escrito em jquery 2.x. Provê compatibilidade entre as versões do jquery.
 *
 *  Utilizado para o kendo, principalemente kendo-grid.
*/

// Plugin de compatibilidade do jquery 2.x para o 3.x
require('jquery-migrate');

// Desativa warns
$.migrateTrace = false;
$.migrateMute = true;

// Resolve conflito entre o jquery-migrate e o angular.
// o angular chama o .data() do jquery com valor undefined, passando pelo polyfill e resultando em erro inesperado
// o polyfill não aceita typeof value !== string.
var oldData = jQuery.data;
jQuery.data = function (elem, name, value) {
    try {
        return oldData(elem, name, value);
    } catch (err) {
        if (err.message !== 'string.replace is not a function') {
            throw Error(err);
        }
    }
};
