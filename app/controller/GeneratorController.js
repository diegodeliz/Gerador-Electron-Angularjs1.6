const NotasController = require('./NotasController.js');

class GeneratorController {
    static _gerarNotas(Generator) {
        NotasController.run(Generator);
    }
    static _pararGerarNotas(Generator) {
        //NotasController.pararGerarNotas();
    }
}

module.exports = GeneratorController;