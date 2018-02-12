let NoteData = require('../models/note');
const fs = require('fs');

function getNote(res) {
    NoteData.find(function (err, note) {
        if (err) {res.send(err);}
        res.json(note); 
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
    app.get('/api/note', function (req, res) {
        getNote(res);
    });
    //GetByID
    app.get('/api/note/:note_id', function(req, res) {   
        NoteData.find({"_id": req.params.note_id},{},function(e,docs){
            res.json(docs);
        });
    });
    app.post('/api/note', function (req, res) {
        let dir = './src/data/';
        let conteudo = fs.readFileSync(req.body.origem, 'utf8');
        fs.writeFileSync(dir + 'arquivo.tmp', conteudo);
        var Note = new NoteData({
            origem: req.body.origem,
            origemName: req.body.origemName,
            nome: req.body.nome,
            nota: conteudo,
            empresa: req.body.empresa,
            cnpj: req.body.cnpj,
            ie: req.body.ie
        });
        Note.save(function (err) {
            if (err) throw err;
            res.json(Note); 
        });
    });
    app.delete('/api/note/:note_id', function (req, res) {
        NoteData.remove({
            _id: req.params.note_id
        }, function (err, note) {
            if (err)
                res.send(err);
            getNote(res);
        });
    });
    app.put('/api/note/:note_id', (req, res) => {
        NoteData.findOneAndUpdate({_id: req.body._id}, {
          $set: {
            origem: req.body.origem,
            origemName: req.body.origemName,
            nome: req.body.nome,
            empresa: req.body.empresa,
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
