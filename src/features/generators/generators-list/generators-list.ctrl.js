/* @ngInject */
/* global kendo */
module.exports = function generatorsListController($scope, Todos, $state, nddKendoGridApiService, nddConfirmDialogService) {
    var self = this;
    var grid;

    var dataSource = new window.kendo.data.DataSource({
        transport: {
            read: {
            	url: 'api/todos',
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
                    Nomenclatura: {
                        type: 'string'
                    },
                    Origem: {
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
        grid = $('#generatorsGrid #grid');

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
                    allPages: 'Todos'
                }
            },
            resizable: true,
            columns: [
                {
                    field: 'nomenclatura',
                    title: 'Nomenclatura',
                    width: 170,
                    template: '#:nomenclatura#'
                },
                {
                    field: 'origemName',
                    title: 'Origem',
                    width: 360,
                    template: '#:origemName#'
                },
                {
                    field: 'serie',
                    title: 'Serie',
                    width: 60,
                    template: '#:serie#'
                },
                {
                    field: 'numero',
                    title: 'Número',
                    width: 60,
                    template: '#:numero#'
                },
                {
                    title: 'Gerar Notas',
                    width: 110,
                    template: '<button class="btn right-align right" ng-click="$parent.$parent.$ctrl.open#:_id#">Gerar</button>'
                }
            ]
        };

        self.gridFilterOptions = {
            advanced: {
                columns: require('./values/generators-list-kendo-filter-options.js')
            },
            searchbar: {
                textSearchbar: 'Pesquisar',
                iconSearchbar: 'fa fa-search',
                filter: [{
                    prop: 'nomenclatura',
                    field: 'nomenclatura',
                    operator: 'contains'
                }]
            }
        };

        self.gridHeaderOptions = {
            options: [{
                    text: 'Novo',
                    icon: 'fa fa-plus',
                    action: addGeneratorAction,
                    hideNavMobile: true
                },
                {
                    text: 'Excluir',
                    icon: 'fa fa-remove',
                    action: excludeGeneratorAction,
                    needSelectRow: true
                },
                {
                    text: 'Abrir',
                    icon: 'fa fa-expand',
                    action: detailGeneratorAction,
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
        $state.go('app.generators.detail.dashboard', {
            id: selected._id
        });
    }

    this.open = function (_id) {
        $state.go('app.generators.detail.dashboard', {
            id: _id
        });
    };

    // Header Actions
    function addGeneratorAction() {
        $state.go('app.generators.register');
    }

    function detailGeneratorAction(selectedGenerators) {
        $state.go('app.generators.detail.dashboard', {
            id: selectedGenerators[0]._id
        });
    }

    function excludeGeneratorAction(selectedGenerators) {
        nddConfirmDialogService.showDialog({
            title: 'Confirmar Exclusão',
            messageText: 'Deseja realmente excluir ? Essa ação não pode ser desfeita.',
            buttonConfirmText: 'Confirmar',
            buttonCancelText: 'Cancelar' // texto do botão de cancelar
        }, function () {
            deleteOneByOne(selectedGenerators);
        });
    }

    // private methods
    function deleteOneByOne(selectedGenerators) {
        kendo.ui.progress(grid, true);
        Todos.delete(selectedGenerators[0]._id).then(function (data) {
            selectedGenerators.splice(0, 1);
            if (selectedGenerators.length > 0) {
                deleteOneByOne(selectedGenerators);
            } else {
                kendo.ui.progress(grid, false);
                nddKendoGridApiService.reload('generatorsGrid');
            }
        }, onDeleteError);
    }

    function onDeleteError() {
        alert('Erro ao excluir !!');
        kendo.ui.progress(grid, false);
	}
}