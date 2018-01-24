let GeneratorData = require('../models/generator');
const fs = require('fs');

function getFile(req, res) {
    GeneratorData.find({
        "_id": req.params._id
    }, function(e,data){
        if (e) {
            console.log("teste"); 
            return res.send(e);
        }

        let obj = JSON.parse(JSON.stringify(data)); 
        let dir = './src/data/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        } 
        if (!fs.existsSync(dir + 'arquivo' + req.params._id + '.tmp')){
            let conteudo = fs.readFileSync(obj[0].origem, 'utf8');
            fs.writeFileSync(dir + 'arquivo' + req.params._id + '.tmp', conteudo);
            return res.send(conteudo);
        } else if (req.params._id == false) {
            console.log("teste");
        } else {
            let conteudo = fs.readFileSync(dir + 'arquivo' + req.params._id + '.tmp', 'utf8');
            return res.send(conteudo);
        }
    });
};

function saveFile(req, res) {
    let dir = './src/data/';  
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);     
    fs.writeFileSync(dir + 'arquivo' + req.body.id + '.tmp', req.body.data);    
};

module.exports = function (app) {
    app.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.get('/api/file/:_id', function(req, res) {   
        getFile(req, res);
    });
    app.post('/api/file', function (req, res) {
        saveFile(req, res);
    }); 
};