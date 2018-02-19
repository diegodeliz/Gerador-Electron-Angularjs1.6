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
        if (req.body.socket == undefined || req.body.socket == "")
            req.body.socket = [{ _id: "", nome: "", ip: "", porta: "", out: ""}]
        if (req.body.jdbc == undefined || req.body.jdbc == "")
            req.body.jdbc = [{ nome: "", host: "", usuario: "", senha: "", banco: "", entrada: "", saida: "", destino: "", captura_retorno: "", apaga_saida: "", _id: "" }];
 
        var Generator = new GeneratorData({
            nota: req.body.nota,
            tipoEnvio: req.body.tipoEnvio,
            cancelamento: req.body.cancelamento,
            ped_ajuste: req.body.ped_ajuste,
            destino: req.body.destino,
            tipoEmissao: req.body.tipoEmissao,
            agentes: req.body.agentes,
            serie: req.body.serie,
            numero: req.body.numero,
            quantidade: req.body.quantidade,
            nomenclatura: req.body.nomenclatura,
            fuso: req.body.fuso,
            sleep: req.body.sleep,
            jdbc: req.body.jdbc,
            socket: req.body.socket,
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
            nota: [{ origem: req.body.nota[0].origem, origemName: req.body.nota[0].origemName, nome: req.body.nota[0].nome, nota: req.body.nota[0].nota, empresa: req.body.nota[0].empresa, cnpj: req.body.nota[0].cnpj, ie: req.body.nota[0].ie, _id: req.body.nota[0]._id }],
            cancelamento: req.body.cancelamento,
            ped_ajuste: req.body.ped_ajuste,
            tipoEnvio: req.body.tipoEnvio,
            destino: req.body.destino,
            tipoEmissao: req.body.tipoEmissao,
            agentes: req.body.agentes,
            serie: req.body.serie,
            numero: req.body.numero,
            quantidade: req.body.quantidade,
            nomenclatura: req.body.nomenclatura,
            fuso: req.body.fuso,
            sleep: req.body.sleep,
            jdbc: [{ nome: req.body.jdbc[0].nome, host: req.body.jdbc[0].host, usuario: req.body.jdbc[0].usuario, senha: req.body.jdbc[0].senha, banco: req.body.jdbc[0].banco, entrada: req.body.jdbc[0].entrada, saida: req.body.jdbc[0].saida, destino: req.body.jdbc[0].destino, captura_retorno: req.body.jdbc[0].captura_retorno, apaga_saida: req.body.jdbc[0].apaga_saida, _id: req.body.jdbc[0]._id }],
            socket: [{ nome: req.body.socket[0].nome, _id: req.body.socket[0]._id, ip: req.body.socket[0].ip, porta: req.body.socket[0].porta, out: req.body.socket[0].out }],
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
