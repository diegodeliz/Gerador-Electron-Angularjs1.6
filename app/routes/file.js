let NoteData = require('../models/note');
const fs = require('fs');

function getFile(req, res) {
    if (req.params._id === "000") {
        let dir = './src/data/';
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);

        let conteudo = fs.readFileSync(dir + 'arquivo.tmp', 'utf8');
        return res.send(conteudo);
    } else {
        NoteData.findById(req.params._id, 'nota', function (err, dados) {
            return res.send(dados.nota);
        });
    }
};

function saveFile(req, res) {
    let dir = './src/data/';
    if (req.body._id === "000") {
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);
        let conteudo = fs.readFileSync(req.body.origem, 'utf8');
        fs.writeFileSync(dir + 'arquivo.tmp', conteudo);
        return res.send();
    } else {
        NoteData.findById(req.body._id, 'origem', function (err, dados) {
            let conteudo = fs.readFileSync(dados.origem, 'utf8');
            fs.writeFileSync(dir + 'arquivo.tmp', conteudo);
            NoteData.findOneAndUpdate({ _id: req.body._id }, {
                $set: { nota: conteudo, }
            }, {
                sort: { _id: -1 },
                upsert: true
            }, (err, result) => {
                if (err)
                    return res.send(err)
            })
        });
    }
};

function changeFile(req, res) {
    let dir = './src/data/';
    if (req.body.id === "000") {
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);
        fs.writeFileSync(dir + 'arquivo.tmp', req.body.data);
        return res.send();
    } else {
        fs.writeFileSync(dir + 'arquivo.tmp', req.body.data);
        NoteData.findOneAndUpdate({ _id: req.body.id }, {
            $set: { nota: req.body.data, }
        }, {
            sort: { _id: -1 },
            upsert: true
        }, (err, result) => {
            if (err)
                return res.send(err)
            return res.send();
        });
    }
};

module.exports = function (app) {
    app.all('/', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.get('/api/file/:_id', function (req, res) {
        getFile(req, res);
    });
    app.post('/api/file', function (req, res) {
        saveFile(req, res);
    });
    app.post('/api/fileContent', function (req, res) {
        changeFile(req, res);
    });
    app.put('/api/fileOrigem/:note_id', (req, res) => {
        let conteudo = fs.readFileSync(req.body.origem, 'utf8');
        NoteData.findOneAndUpdate({ _id: req.body._id }, {
            $set: {
                origem: req.body.origem,
                origemName: req.body.origemName,
                nota: conteudo,
            }
        }, {
                sort: { _id: -1 },
                upsert: true
            }, (err, result) => {
                if (err) return res.send(err)
                res.send(result)
            })
    });
};