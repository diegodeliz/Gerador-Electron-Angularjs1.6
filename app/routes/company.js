var Company = require('../models/company');
var Generator = require('../models/generator');

function getCompanies(res) {
    Company.find(function (err, company) {
        if (err) res.send(err);
        res.json(company);
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
    app.get('/api/company', function (req, res) {
        getCompanies(res);
    });
    //GetByID
    app.get('/api/company/:company_id', function (req, res) {
        Company.find({ "_id": req.params.company_id }, {}, function (e, docs) {
            res.json(docs);
        });
    });
    app.post('/api/company', function (req, res) {
        var company = new Company({
            nome: req.body.nome,
            cnpj: req.body.cnpj,
            ie: req.body.ie,
            done: false
        });
        //exemplo de metodo
        //company.dudify(function (err, text) {
            //if (err) throw err;
        //});
        company.save(function (err) {
            if (err) throw err;
            getCompanies(res);
        });
    });
    app.delete('/api/company/:company_id', function (req, res) {
        Company.remove({
            _id: req.params.company_id
        }, function (err, company) {
            if (err) res.send(err);
            getCompanies(res);
        });
    });
    app.put('/api/company/:company_id', (req, res) => {
        Company.findById(req.body._id, (err, result) => {  
            var nomeEmpresa = result.nome;
            if (err) res.status(500).send(err)
            if (result) {
                Company.findOneAndUpdate({ _id: req.body._id }, {
                    $set: {
                        nome: req.body.nome,
                        cnpj: req.body.cnpj,
                        ie: req.body.ie
                    }
                }, {
                    sort: { _id: -1 },
                    upsert: true
                }, (err, resultado) => {
                    if (err) return res.send(err)
                    var cursor = Generator.find({ empresa: nomeEmpresa }).cursor();
                    cursor.on('data', function(docs) {
                        var conditions = { empresa: docs.empresa, cnpj: docs.cnpj, ie: docs.ie }
                            , update = { $set: { empresa: req.body.nome, cnpj: req.body.cnpj, ie: req.body.ie }}
                            , options = { multi: true };
                        Generator.update(conditions, update, options, callback);
                        function callback (err, numAffected) {
                            console.log(numAffected);
                        };
                    });
                    cursor.on('close', function() {
                        res.send(resultado)
                    });
                });
            } else {
                res.status(404).send("Nenhum resultado encontrado")
            }
        });
    });
};
