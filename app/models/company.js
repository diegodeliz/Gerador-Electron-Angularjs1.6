var mongoose = require('mongoose');

module.exports = mongoose.model('tbcompany', {
    nome: {
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