const NotasService = require('../shared/NotasService.js');
let notasController = new NotasService();
class GeneratorController {
    static _gerarNotas(Generator) {
        notasController.run(Generator);
    }
    static _pararGerarNotas(Generator) {
        notasController.pararGerarNotas();
    }
}

module.exports = GeneratorController;