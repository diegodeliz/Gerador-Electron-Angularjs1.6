/* @ngInject */
/* global kendo */
module.exports = function socketsListController($scope, SocketService, $state, nddKendoGridApiService, nddConfirmDialogService) {
    let self = this;
    let grid, detailsTemplate;
    
    let dataSource = new window.kendo.data.DataSource({
        transport: {
            read: {
                url: 'api/socket',
                type: "get",
                dataType: "json"
            },
        },
        schema: {
            data: '',
            total: 'count',
            aggregates: 'aggregates',
            model: {
                Id: '_id',
                fields: {
                    Id: {
                        type: 'string'
                    },
                    Nome: {
                        type: 'string'
                    },
                    IP: {
                        type: 'string'
                    },
                    IE: {
                        type: 'string'
                    }
                }
            }
        },
        pageSize: 10,
        allowUnsort: true,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    this.$onInit = function () {
        grid = $('#socketsGrid #grid');

        self.kendoGridOptions = {
            dataSource: dataSource,
            selectable: 'multiple, row',
            checkbox: true,
            onDbRowClick: function (item) { onEditAction(item); },
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5,
                messages: {
                    display: 'Exibindo {0}-{1} from {2} itens',
                    itemsPerPage: 'Itens por página',
                    empty: 'Não há itens para exibir',
                    allPages: 'SocketService'
                }
            },
            resizable: true,
            columns: [
                {
                    field: 'nome',
                    title: 'Nome',
                    width: 290,
                    headerAttributes: { "class": "center" },
                    attributes: { "class": "n-grid-column-align-center" },
                    template: '#:nome#'
                },
                {
                    field: 'ip',
                    title: 'IP',
                    width: 200,
                    headerAttributes: { "class": "center" },
                    attributes: { "class": "n-grid-column-align-center" },
                    template: '#:ip#'
                },
                {
                    field: 'porta',
                    title: 'Porta',
                    width: 200,
                    headerAttributes: { "class": "center" },
                    attributes: { "class": "n-grid-column-align-center" },
                    template: '#:porta#'
                }
            ]
        };

        self.gridFilterOptions = {
            advanced: {
                columns: require('./values/sockets-list-kendo-filter-options.js')
            },
            searchbar: {
                textSearchbar: 'Pesquisar',
                iconSearchbar: 'fa fa-search',
                filter: [{
                    prop: 'nome',
                    field: 'nome',
                    operator: 'contains'
                },
                {
                    prop: 'ip',
                    field: 'ip',
                    operator: 'contains'
                },
                {
                    prop: 'porta',
                    field: 'porta',
                    operator: 'contains'
                }
                ]
            }
        };

        self.gridHeaderOptions = {
            options: [{
                text: 'Novo',
                icon: 'fa fa-plus',
                action: addSocketAction,
                hideNavMobile: true
            },
            {
                text: 'Excluir',
                icon: 'fa fa-remove',
                action: excludeSocketAction,
                needSelectRow: true
            },
            {
                text: 'Abrir',
                icon: 'fa fa-expand',
                action: detailSocketAction,
                needSelectRow: true,
                needUniqueRow: true
            }
            ],
            responsive: {
                medium: {
                    textAction: 'Ações',
                    textIcon: 'fa fa-check'
                },
                optionsIcon: 'ndd ndd-ellipses'
            }
        };
    };

    function onEditAction(selected) {
        $state.go('app.sockets.detail.dashboard', {
            id: selected._id
        });
    }

    this.open = function (_id) {
        $state.go('app.sockets.detail.dashboard', {
            id: _id
        });
    };

    // Header Actions
    function addSocketAction() {
        $state.go('app.sockets.register');
    }

    function detailSocketAction(selectedSocket) {
        $state.go('app.sockets.detail.dashboard', {
            id: selectedSocket[0]._id
        });
    }

    function excludeSocketAction(selectedSocket) {
        nddConfirmDialogService.showDialog({
            title: 'Confirmar Exclusão',
            messageText: 'Deseja realmente excluir ? Essa ação não pode ser desfeita.',
            buttonConfirmText: 'Confirmar',
            buttonCancelText: 'Cancelar' // texto do botão de cancelar
        }, function () {
            deleteOneByOne(selectedSocket);
        });
    }

    // private methods
    function deleteOneByOne(selectedSocket) {
        kendo.ui.progress(grid, true);
        SocketService.delete(selectedSocket[0]._id).then(function (data) {
            selectedSocket.splice(0, 1);
            if (selectedSocket.length > 0) {
                deleteOneByOne(selectedSocket);
            } else {
                kendo.ui.progress(grid, false);
                nddKendoGridApiService.reload('socketsGrid');
            }
        }, onDeleteError);
    }

    function onDeleteError() {
        alert('Erro ao excluir !!');
        kendo.ui.progress(grid, false);
    }
}