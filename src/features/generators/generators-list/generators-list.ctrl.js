/* @ngInject */
/* global kendo */
module.exports = function generatorsListController($scope, generatorService, $state, nddKendoGridApiService, nddConfirmDialogService, ngDialog) {
    let self = this;
    let grid, detailsTemplate;

    let dataSource = new window.kendo.data.DataSource({
        transport: {
            read: {
                url: 'api/generator',
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
                    allPages: 'generatorService'
                }
            },
            resizable: true,
            columns: [
                {
                    field: 'nomenclatura',
                    title: 'Nomenclatura',
                    width: 170,
                    headerAttributes: { "class": "center" },
                    attributes: { "class": "n-grid-column-align-center" },
                    template: '#:nomenclatura#'
                },
                {
                    field: 'origemName',
                    title: 'Origem',
                    width: 360,
                    headerAttributes: { "class": "center" },
                    attributes: { "class": "n-grid-column-align-center" },
                    template: '#:origemName#'
                },
                {
                    field: 'serie',
                    title: 'Serie',
                    width: 60,
                    headerAttributes: { "class": "center" },
                    attributes: { "class": "n-grid-column-align-center" },
                    template: '#:serie#'
                },
                {
                    field: 'numero',
                    title: 'Número',
                    width: 60,
                    headerAttributes: { "class": "center" },
                    attributes: { "class": "n-grid-column-align-center" },
                    template: '#:numero#'
                },
                {
                    field: 'quantidade',
                    title: 'Qtnd',
                    width: 60,
                    headerAttributes: { "class": "center" },
                    attributes: { "class": "n-grid-column-align-center" },
                    template: '#:quantidade#'
                },
                { command: { text: "Gerar Notas", click: showDetails }, title: "gerar ", width: "120px" }
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

    function showDetails(e) {
        e.preventDefault();
        let dataItem = this.dataItem($(e.currentTarget).closest("tr"));

        self.inicioNota = 1;
        self.finalNota = dataItem.quantidade;

        var dialog = ngDialog.open({
            template: '\
                <header><i class="fa fa-2x fa-check"></i><h4> Gerador de Massas Ativo </h4></header>\
                <div class="dialog-content">\
                    <p id="numeroGerado">Gerando nota <span id="inicioNota">' + self.inicioNota + '</span>/<span id="finalNota">' + dataItem.quantidade + '</span></p>\
                </div>\
                <div class="footer-actions row">\
                    <button id="dialog-action-confirm" type="button" class="btn btn-default" ng-click="closeThisDialog()"> Clique para encerrar o processo </button>\
                </div>',
            plain: true,
            closeByEscape: false,
            closeByNavigation: false,
            showClose: false,
            closeByDocument: false,
            scope: $scope,
            resolve: {
                dep: function depFactory() {
                    (function alteraNumero(i) {
                        setTimeout(function () {
                            document.getElementById("inicioNota").innerHTML = self.inicioNota;
                            self.inicioNota++;
                            if (--i) alteraNumero(i);
                        }, dataItem.sleep)
                    })(dataItem.quantidade);

                    generatorService.geraNotas(dataItem._id);
                }
            }
        });

        dialog.closePromise.then(function (data) {
            generatorService.pararGerarNotas(dataItem._id).then(function (data) {
                nddKendoGridApiService.reload('generatorsGrid');
            });
        });
    }
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
            buttonCancelText: 'Cancelar'
        }, function () {
            deleteOneByOne(selectedGenerators);
        });
    }

    // private methods
    function deleteOneByOne(selectedGenerators) {
        kendo.ui.progress(grid, true);
        generatorService.delete(selectedGenerators[0]._id).then(function (data) {
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