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
            let dir = './src/data/';
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            } 
            if (fs.existsSync(obj[0].origem)){
                let conteudo = fs.readFileSync(obj[0].origem, 'utf8');
                fs.writeFileSync(dir + 'arquivo.tmp', conteudo);
                res.send(conteudo);
            }
            try {
                conteudo = fs.readFileSync(dir + 'arquivo.tmp', 'utf8');
                $('#textarea1').value = conteudo; 
            } catch (error) {
                conteudo = fs.readFileSync(dir + 'arquivo.tmp', 'utf8');
                res.send(conteudo);
                console.log("Arquivo .tmp não encontrado. Gerando novo arquivo com base na URL de origem" + error);
            }
        });
    });
};