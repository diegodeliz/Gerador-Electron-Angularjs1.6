var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var jdbc = new Schema({
    nome: {
        type: String,
        default: ''
    },
    host: {
        type: String,
        default: ''
    },
    usuario: {
        type: String,
        default: ''
    },
    senha: {
        type: String,
        default: ''
    },
    banco: {
        type: String,
        default: ''
    },
    entrada: {
        type: String,
        default: ''
    },
    saida: {
        type: String,
        default: ''
    },
    destino: {
        type: String,
        default: ''
    },
    captura_retorno: {
        type: String,
        default: ''
    },
    apaga_saida: {
        type: String,
        default: ''
    }
});

// the schema is useless so far
// we need to create a model using it
var Jdbc = mongoose.model("tbjdbc", jdbc);

// make this available to our users in our Node applications
module.exports = Jdbc;