var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var generator = new Schema({
    tipoEnvio: {
        type: Number,
        default: '1'
    },
    nota: {
        type: Array,
        default: ''
    },
    destino: {
        type: String,
        default: ''
    },
    tipoEmissao: {
        type: Number,
        default: '1'
    },
    agentes: {
        type: Number,
        default: '1'
    },
    serie: {
        type: Number,
        default: ''
    },
    numero: {
        type: Number,
        default: ''
    },
    quantidade: {
        type: Number,
        default: ''
    },
    nomenclatura: {
        type: String,
        default: ''
    },
    fuso: {
        type: Number,
        default: '-2'
    },
    sleep: {
        type: Number,
        default: ''
    },
    jdbc: {
        type: Array,
        default: ''
    },
    socket: {
        type: Array,
        default: ''
    },
});

// the schema is useless so far
// we need to create a model using it
var Generator = mongoose.model("tbgenerator", generator);

// make this available to our users in our Node applications
module.exports = Generator;