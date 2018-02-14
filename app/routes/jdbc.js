var Jdbc = require('../models/jdbc');
var Generator = require('../models/generator');

function getJdbcs(res) {
    Jdbc.find(function (err, jdbc) {
        if (err) res.send(err);
        res.json(jdbc);
    });
};

module.exports = function (app) {
    app.all('/', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    //app.get('*', function (req, res) {
    //res.sendFile(__dirname + '/dist/index.html');
    //});
    app.get('/api/jdbc', function (req, res) {
        getJdbcs(res);
    });
    //GetByID
    app.get('/api/jdbc/:jdbc_id', function (req, res) {
        Jdbc.find({ "_id": req.params.jdbc_id }, {}, function (e, docs) {
            res.json(docs);
        });
    });
    app.post('/api/jdbc', function (req, res) {
        var jdbc = new Jdbc({
            nome: req.body.nome,
            host: req.body.host,
            usuario: req.body.usuario,
            senha: req.body.senha,
            banco: req.body.banco,
            entrada: req.body.entrada,
            saida: req.body.saida,
            destino: req.body.destino,
            captura_retorno: req.body.captura_retorno,
            apaga_saida: req.body.apaga_saida
        });
        //exemplo de metodo
        //jdbc.dudify(function (err, text) {
            //if (err) throw err;
        //});
        jdbc.save(function (err) {
            if (err) throw err;
            getJdbcs(res);
        });
    });
    app.delete('/api/jdbc/:jdbc_id', function (req, res) {
        Jdbc.remove({
            _id: req.params.jdbc_id
        }, function (err, jdbc) {
            if (err) res.send(err);
            getJdbcs(res);
        });
    });
    app.put('/api/jdbc/:jdbc_id', (req, res) => {
        Jdbc.findOneAndUpdate({_id: req.body._id}, {
            $set: {
                nome: req.body.nome,
                host: req.body.host,
                usuario: req.body.usuario,
                senha: req.body.senha,
                banco: req.body.banco,
                entrada: req.body.entrada,
                saida: req.body.saida,
                destino: req.body.destino,
                captura_retorno: req.body.captura_retorno,
                apaga_saida: req.body.apaga_saida
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
