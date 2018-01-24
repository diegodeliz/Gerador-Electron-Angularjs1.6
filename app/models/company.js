var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var company = new Schema({
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

//exemplo de método
company.methods.dudify = function () {
    this.text = this.text + "-dude";
    return this.text;
};

// the schema is useless so far
// we need to create a model using it
var Company = mongoose.model("tbcompany", company);

// make this available to our users in our Node applications
module.exports = Company;