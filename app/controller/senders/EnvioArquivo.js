const fs = require('fs');
class EnvioArquivo {
    constructor(destino, caminho, conteudo, agenteId){
        console.log(destino + agenteId + '\\in\\' + caminho);
        fs.writeFileSync(destino + agenteId + '\\in\\' + caminho, conteudo);
    }
}

module.exports = EnvioArquivo;