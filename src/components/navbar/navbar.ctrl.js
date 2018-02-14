/* @ngInject */
module.exports = function navbarController( $state, nddSidebarService) {
    var self = this;

    self.toggleCollapse = nddSidebarService.toggleCollapse;

    self.dropdownOptions = {
        button: {
            text: 'Menu',
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
                    },
                    {
                        text: 'Nota Fiscal',
                        action: toFiscalNotes
                    },
                    {
                        text: 'JDBC',
                        action: toJdbc
                    },
                    {
                        text: 'Socket',
                        action: toSocket
                    }
                ]
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

    function toFiscalNotes() {
        $state.go('app.notes.list');
    }

    function toJdbc() {
        $state.go('app.jdbcs.list');
    }

    function toSocket() {
        $state.go('app.sockets.list');
    }
}