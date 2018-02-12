var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var note = new Schema({
    origem: {
        type: String,
        default: ''
    },
    origemName: {
        type: String,
        default: ''
    },
    nome: {
        type: String,
        default: ''
    },
    nota: {
        type: String,
        default: ''
    },
    empresa: {
        type: String,
        default: ''
    },
    cnpj: {
        type: String,
        default: ''
    },
    ie: {
        type: String,
        default: ''
    }
});

// the schema is useless so far
// we need to create a model using it
var Note = mongoose.model("tbnote", note);

// make this available to our users in our Node applications
module.exports = Note;