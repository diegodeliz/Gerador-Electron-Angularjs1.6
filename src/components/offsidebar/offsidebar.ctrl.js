/* @ngInject */
module.exports = function offsidebarController($scope) {
    var self = this;

    self.faqs = [
        {
            name: 'O que é o nddResearch ?',
            content: 'Este projeto foi concebido para servir de referência para um novo portal web.'
        },
        {
            name: 'Como foi desenvolvido ?',
            content: 'O webapp foi construido baseado em Single Page Apps (SPA) com ASP.NET Web API 2 e AngularJS.'
        },
        {
            name: 'Tecnologias Server-Side',
            content: 'ASP.NET - Web API 2 - CQRS - OData - Redis'
        },
        {
            name: 'Tecnologias Client-Side',
            content: 'HTML5 - CSS3  - CQRS - AngularJS - WebPack'
        }];
};
