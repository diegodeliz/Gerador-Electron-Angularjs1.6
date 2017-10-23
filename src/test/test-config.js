/* @ngInject */
module.exports = function ($compileProvider, $qProvider, $provide) {
    /*
     * Configurações gerais somente para os testes unitários da aplicação
     * 
    */
    // compatibilidade com angular < 1.6
    $compileProvider.preAssignBindingsEnabled(true);  
    // não tornar obrigatório o tratamento de erro nas promessas
    $qProvider.errorOnUnhandledRejections(false);
}