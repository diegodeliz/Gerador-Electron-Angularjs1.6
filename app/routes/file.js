let Todo = require('../models/generator');
const fs = require('fs');

function getFile(res) {
    let dir = '../../src/data/';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    } 
    if (fs.existsSync(model)){
        let conteudo = fs.readFileSync(model, 'utf8');
        fs.writeFileSync(dir + 'arquivo.tmp', conteudo);
    } else {
        throw new Error('Pau na budeguinha');
    }
};

function salvarArquivo(conteudo){
    let dir = './data/arquivo.tmp';            
    fs.writeFileSync(dir, conteudo, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Arquivo temporário salvo com sucesso");
    });           
}

module.exports = function (app) {
    app.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.get('/api/file/:_id', function(req, res) {   
        Todo.find({"_id": req.params._id},function(e,data){
            let obj = JSON.parse(JSON.stringify(data)); 
            res.send(obj[0].origem);
        });
    });
};