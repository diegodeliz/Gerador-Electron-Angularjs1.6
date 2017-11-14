/* @ngInject */
module.exports = function navbarController( $state, nddSidebarService) {
    var self = this;

    self.toggleCollapse = nddSidebarService.toggleCollapse;

    self.dropdownOptions = {
        button: {
            text: 'NFCe',
        },
        menu: [
            {
                text: 'NFCe',
                options: [
                    {
                        text: 'Gerador',
                        action: toGenerator
                    },
                    {
                        text: 'Empresa',
                        action: toCompanies
                    }]
            },
            {
                text: 'Sair',
                icon: 'fa fa-sign-out'
            }
        ]
    };

    function toGenerator() {
        $state.go('app.generators.list');
    }

    function toCompanies() {
        $state.go('app.companies.list');
    }
}