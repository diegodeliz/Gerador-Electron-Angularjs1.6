/* @ngInject */
/* global kendo */
module.exports = function massGeneratorListController(massGeneratorService, $state, nddKendoGridApiService, nddConfirmDialogService, appConfig) {
    var self = this;
    var grid;

    var dataSource = new window.kendo.data.DataSource({
        type: 'odata-v4',
        transport: {
            read: {
                url: appConfig.apiUrl + 'massGenerator'
            }
        },
        schema: {
            data: 'items',
            total: 'count',
            aggregates: 'aggregates',
            model: {
                Id: 'id',
                fields: {
                    Id: {
                        type: 'number'
                    },
                    Name: {
                        type: 'string'
                    },
                    Email: {
                        type: 'string'
                    },
                    FicalCode: {
                        type: 'string'
                    },
                    Status: {
                        type: 'string'
                    },
                    TypeFical: {
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
        grid = $('#massGeneratorGrid #grid');

        self.gridHeaderOptions = {
            options: [{
                    text: 'Novo',
                    icon: 'fa fa-plus',
                    action: function(){
                        $state.go('app.massGenerator.create');
                    }
                }
            ]
        };

        self.kendoGridOptions = {
            dataSource: dataSource,
            selectable: 'multiple, row',
            checkbox: true,
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
            columns: [{
                    field: 'id',
                    title: 'Id',
                    width: 60
                },
                {
                    field: 'name',
                    title: 'Nome',
                    template: '<a class="ndd-kendo-grid__link" ng-click="$parent.$parent.$ctrl.open(#:id#)">#:name#</a>'
                },
                {
                    field: 'fiscalCode',
                    title: 'Código Fiscal'
                },
                {
                    field: 'email',
                    title: 'E-mail'
                },
                {
                    field: 'fiscalType',
                    title: 'Tipo Fical'
                },
                {
                    field: 'isActivated',
                    title: 'Status',
                    template: '<span>#:isActivated ? "Ativo": "Desativado"#</span>'
                }
            ]
        };

        self.gridHeaderOptions = {
            options: [{
                    text: 'Novo',
                    icon: 'fa fa-plus',
                    action: addMassGeneratorAction,
                    hideNavMobile: true
                },
                {
                    text: 'Excluir',
                    icon: 'fa fa-remove',
                    action: excludeMassGeneratorAction,
                    needSelectRow: true
                },
                {
                    text: 'Abrir',
                    icon: 'fa fa-expand',
                    action: detailMassGeneratorAction,
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

    this.open = function (id) {
        $state.go('app.massGenerator.detail.dashboard', {
            id: id
        });
    };

    // Header Actions
    function addMassGeneratorAction() {
        $state.go('app.massGenerator.create');
    }

    function detailMassGeneratorAction(selectedMassGenerator) {
        $state.go('app.massGenerator.detail.dashboard', {
            id: selectedMassGenerator[0].id
        });
    }

    function excludeMassGeneratorAction(selectedMassGenerator) {
        nddConfirmDialogService.showDialog({
            title: 'Confirmar Exclusão',
            messageText: 'Deseja realmente excluir ? Essa ação não pode ser desfeita.',
            buttonConfirmText: 'Confirmar',
            buttonCancelText: 'Cancelar' // texto 
        }, function () {
            deleteOneByOne(selectedMassGenerator);
        });
    }

    // private methods
    function deleteOneByOne(selectedMassGenerator) {
        kendo.ui.progress(grid, true);
        massGeneratorService.removeMassGenerator(selectedMassGenerator[0].id).then(function (data) {
            selectedMassGenerator.splice(0, 1);
            if (selectedMassGenerator.length > 0) {
                deleteOneByOne(selectedMassGenerator);
            } else {
                kendo.ui.progress(grid, false);
                nddKendoGridApiService.reload('massGeneratorGrid');
            }
        }, onDeleteError);
    }

    function onDeleteError() {
        alert('Erro ao excluir !!');
        kendo.ui.progress(grid, false);
    }
};