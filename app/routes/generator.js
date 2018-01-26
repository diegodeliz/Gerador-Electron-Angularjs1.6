let GeneratorData = require('../models/generator');
const fs = require('fs');
const GeneratorController = require('../controller/GeneratorController.js');

function getGenerator(res) {
    GeneratorData.find(function (err, generator) {
        if (err) {res.send(err);}
        res.json(generator); 
    });
};

module.exports = function (app) {
    app.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    //app.get('*', function (req, res) {
        //res.sendFile(__dirname + '/dist/index.html');
    //});
    app.get('/api/generator', function (req, res) {
        getGenerator(res);
    });
    //GetByID
    app.get('/api/generator/:generator_id', function(req, res) {   
        GeneratorData.find({"_id": req.params.generator_id},{},function(e,docs){
            res.json(docs);
        });
    });
    app.post('/api/generator', function (req, res) {
        var Generator = new GeneratorData({
            tipoEnvio: req.body.tipoEnvio,
            text: req.body.text,
            origem: req.body.origem,
            origemName: req.body.origemName,
            destino: req.body.destino,
            tipoEmissao: req.body.tipoEmissao,
            agentes: req.body.agentes,
            serie: req.body.serie,
            numero: req.body.numero,
            quantidade: req.body.quantidade,
            nomenclatura: req.body.nomenclatura,
            fuso: req.body.fuso,
            sleep: req.body.sleep,
            empresa: req.body.empresa,
            cnpj: req.body.cnpj,
            ie: req.body.ie,
            host: req.body.host,
            user: req.body.user,
            password: req.body.password,
            database: req.body.database,
            table: req.body.table,
            ipSocket: req.body.ipSocket,
            porta: req.body.porta,
            out: req.body.out,
            done: false
        });
        Generator.save(function (err) {
            if (err) throw err;
            res.json(Generator); 
        });
    });
    app.get('/api/geraNotas/:generator_id', function(req, res) {   
        GeneratorData.findById(req.params.generator_id, function (err, result) {
            GeneratorController._gerarNotas(result);
        });
        res.send(req.params.generator_id);
    });
    app.get('/api/pararGerarNotas/:generator_id', function(req, res) {   
        GeneratorData.findById(req.params.generator_id, function (err, result) {
            GeneratorController._pararGerarNotas(result);
        });
        res.send(req.params.generator_id);
    });
    app.delete('/api/generator/:generator_id', function (req, res) {
        GeneratorData.remove({
            _id: req.params.generator_id
        }, function (err, generator) {
            if (err)
                res.send(err);
            getGenerator(res);
        });
    });
    app.put('/api/generator/:generator_id', (req, res) => {
        GeneratorData.findOneAndUpdate({_id: req.body._id}, {
          $set: {
            tipoEnvio: req.body.tipoEnvio,  
            text: req.body.text,
            origem: req.body.origem,
            origemName: req.body.origemName,
            destino: req.body.destino,
            tipoEmissao: req.body.tipoEmissao,
            agentes: req.body.agentes,
            serie: req.body.serie,
            numero: req.body.numero,
            quantidade: req.body.quantidade,
            nomenclatura: req.body.nomenclatura,
            fuso: req.body.fuso,
            sleep: req.body.sleep,
            empresa: req.body.empresa,
            cnpj: req.body.cnpj,
            ie: req.body.ie,
            host: req.body.host,
            user: req.body.user,
            password: req.body.password,
            database: req.body.database,
            table: req.body.table,
            ipSocket: req.body.ipSocket,
            porta: req.body.porta,
            out: req.body.out,
            done: false
          }
        }, {
          sort: {_id: -1},
          upsert: true
        }, (err, result) => {
          if (err) return res.send(err)
          res.send(result)
        })
    });      
};
