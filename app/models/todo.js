var mongoose = require('mongoose');

module.exports = mongoose.model('tbtodo', {
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
        default: ''
    },
    agentes: {
        type: Number,
        default: ''
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
        default: ''
    },
    sleep: {
        type: Number,
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