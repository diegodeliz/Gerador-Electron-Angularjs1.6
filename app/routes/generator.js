var Todo = require('../models/generator');

function getGenerator(res) {
    Todo.find(function (err, generator) {
        if (err) {
            res.send(err);
        }

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
        Todo.find({"_id": req.params.generator_id},{},function(e,docs){
            res.json(docs);
        });
    });
    app.post('/api/generator', function (req, res) {
        Todo.create({
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
            cnpj: req.body.cnpj,
            ie: req.body.ie,
            done: false
        }, function (err, generator) {
            if (err)
                res.send(err);
            getGenerator(res);
        });
    });
    app.get('/api/teste/:generator_id', function(req, res) {   
        res.send(req.params.generator_id);
    });
    app.delete('/api/generator/:generator_id', function (req, res) {
        Todo.remove({
            _id: req.params.generator_id
        }, function (err, generator) {
            if (err)
                res.send(err);
            getGenerator(res);
        });
    });
    app.put('/api/generator/:generator_id', (req, res) => {
        Todo.findOneAndUpdate({_id: req.body._id}, {
          $set: {
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
            cnpj: req.body.cnpj,
            ie: req.body.ie
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
