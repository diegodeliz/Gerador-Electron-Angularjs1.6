var Company = require('../models/company');

function getCompanies(res) {
    Company.find(function (err, company) {
        if (err) {
            res.send(err);
        }

        res.json(company); 
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
    app.get('/api/company', function (req, res) {
        getCompanies(res);
    });
    //GetByID
    app.get('/api/company/:company_id', function(req, res) {   
        Company.find({"_id": req.params.company_id},{},function(e,docs){
            res.json(docs);
        });
    });
    app.post('/api/company', function (req, res) {
        Company.create({
            nome: req.body.nome,
            cnpj: req.body.cnpj,
            ie: req.body.ie,
            done: false
        }, function (err, company) {
            if (err)
                res.send(err);
            getCompanies(res);
        });
    });
    app.delete('/api/company/:company_id', function (req, res) {
        Company.remove({
            _id: req.params.company_id
        }, function (err, company) {
            if (err)
                res.send(err);
            getCompanies(res);
        });
    });
    app.put('/api/company/:company_id', (req, res) => {
        Company.findOneAndUpdate({_id: req.body._id}, {
          $set: {
            nome: req.body.nome,
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
