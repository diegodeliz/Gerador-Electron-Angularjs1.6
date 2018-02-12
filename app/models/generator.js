var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var generator = new Schema({
    tipoEnvio: {
        type: Number,
        default: '1'
    },
    _idNota: {
        type: String,
        default: ''
    },
    nota: {
        type: String,
        default: ''
    },
    origem: {
        type: String,
        default: ''
    },
    origemName: {
        type: String,
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
    },
    host: {
        type: String,
        default: 'localhost'
    },
    user: {
        type: String,
        default: 'root'
    },
    password: {
        type: String,
        default: 'vertrigo'
    },
    database: {
        type: String,
        default: 'nfce'
    },
    table: {
        type: String,
        default: 'nfceinput'
    },
    ipSocket: {
        type: String,
        default: 'localhost'
    },
    porta: {
        type: String,
        default: '8081'
    },
    out: {
        type: String,
        default: 'C:\Users\diego.liz\Desktop\Aplicação TCP-IP\out'
    }
});

// the schema is useless so far
// we need to create a model using it
var Generator = mongoose.model("tbgenerator", generator);

// make this available to our users in our Node applications
module.exports = Generator;