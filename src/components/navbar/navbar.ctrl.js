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
                        action: tomassGenerator
                    }]
            },
            {
                text: 'Sair',
                icon: 'fa fa-sign-out'
            }
        ]
    };

    function tomassGenerator() {
        $state.go('app.massGenerator.list');
    }
}