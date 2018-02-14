/* @ngInject */
/* global kendo */
module.exports = function jdbcsListController($scope, JdbcsService, $state, nddKendoGridApiService, nddConfirmDialogService) {
    let self = this;
    let grid, detailsTemplate;
    
    let dataSource = new window.kendo.data.DataSource({
        transport: {
            read: {
                url: 'api/jdbc',
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
                    Host: {
                        type: 'string'
                    },
                    Banco: {
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
        grid = $('#jdbcsGrid #grid');

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
                    allPages: 'JdbcsService'
                }
            },
            resizable: true,
            columns: [
                {
                    field: 'nome',
                    title: 'Nome',
                    width: 400,
                    headerAttributes: { "class": "left" },
                    template: '#:nome#'
                },
                {
                    field: 'host',
                    title: 'Host',
                    width: 160,
                    headerAttributes: { "class": "center" },
                    attributes: { "class": "n-grid-column-align-center" },
                    template: '#:host#'
                },
                {
                    field: 'banco',
                    title: 'Banco',
                    width: 160,
                    headerAttributes: { "class": "center" },
                    attributes: { "class": "n-grid-column-align-center" },
                    template: '#:banco#'
                }
            ]
        };

        self.gridFilterOptions = {
            advanced: {
                columns: require('./values/jdbcs-list-kendo-filter-options.js')
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
                    prop: 'host',
                    field: 'host',
                    operator: 'contains'
                },
                {
                    prop: 'banco',
                    field: 'banco',
                    operator: 'contains'
                }
                ]
            }
        };

        self.gridHeaderOptions = {
            options: [{
                text: 'Novo',
                icon: 'fa fa-plus',
                action: addJdbcAction,
                hideNavMobile: true
            },
            {
                text: 'Excluir',
                icon: 'fa fa-remove',
                action: excludeJdbcAction,
                needSelectRow: true
            },
            {
                text: 'Abrir',
                icon: 'fa fa-expand',
                action: detailJdbcAction,
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
        $state.go('app.jdbcs.detail.dashboard', {
            id: selected._id
        });
    }

    this.open = function (_id) {
        $state.go('app.jdbcs.detail.dashboard', {
            id: _id
        });
    };

    // Header Actions
    function addJdbcAction() {
        $state.go('app.jdbcs.register');
    }

    function detailJdbcAction(selectedJdbcs) {
        $state.go('app.jdbcs.detail.dashboard', {
            id: selectedJdbcs[0]._id
        });
    }

    function excludeJdbcAction(selectedJdbcs) {
        nddConfirmDialogService.showDialog({
            title: 'Confirmar Exclusão',
            messageText: 'Deseja realmente excluir ? Essa ação não pode ser desfeita.',
            buttonConfirmText: 'Confirmar',
            buttonCancelText: 'Cancelar' // texto do botão de cancelar
        }, function () {
            deleteOneByOne(selectedJdbcs);
        });
    }

    // private methods
    function deleteOneByOne(selectedJdbcs) {
        kendo.ui.progress(grid, true);
        JdbcsService.delete(selectedJdbcs[0]._id).then(function (data) {
            selectedJdbcs.splice(0, 1);
            if (selectedJdbcs.length > 0) {
                deleteOneByOne(selectedJdbcs);
            } else {
                kendo.ui.progress(grid, false);
                nddKendoGridApiService.reload('jdbcsGrid');
            }
        }, onDeleteError);
    }

    function onDeleteError() {
        alert('Erro ao excluir !!');
        kendo.ui.progress(grid, false);
    }
}