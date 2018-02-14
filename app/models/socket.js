var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var socket = new Schema({
    nome: {
        type: String,
        default: ''
    },
    ip: {
        type: String,
        default: ''
    },
    porta: {
        type: String,
        default: ''
    },
    out: {
        type: String,
        default: ''
    }
});

var Socket = mongoose.model("tbsocket", socket);

// make this available to our users in our Node applications
module.exports = Socket;