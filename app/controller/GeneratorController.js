const NotasController = require('./NotasController.js');
let notasController = new NotasController();
class GeneratorController {
    static _gerarNotas(Generator) {
        notasController.run(Generator);
    }
    static _pararGerarNotas(Generator) {
        notasController.pararGerarNotas();
    }
}

module.exports = GeneratorController;