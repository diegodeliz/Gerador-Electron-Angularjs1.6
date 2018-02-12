/* @ngInject */
/* global kendo */
module.exports = function notesListController($scope, noteService, $state, nddKendoGridApiService, nddConfirmDialogService) {
    let self = this;
    let grid, detailsTemplate;
    
    let dataSource = new window.kendo.data.DataSource({
        transport: {
            read: {
                url: 'api/note',
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
        grid = $('#notesGrid #grid');

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
                    allPages: 'noteService'
                }
            },
            resizable: true,
            columns: [
                {
                    field: 'nome',
                    title: 'Nome',
                    width: 170,
                    headerAttributes: { "class": "center" },
                    attributes: { "class": "n-grid-column-align-center" },
                    template: '#:nome#'
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
                    field: 'empresa',
                    title: 'Empresa',
                    width: 160,
                    headerAttributes: { "class": "center" },
                    attributes: { "class": "n-grid-column-align-center" },
                    template: '#:empresa#'
                }
            ]
        };

        self.gridFilterOptions = {
            advanced: {
                columns: require('./values/notes-list-kendo-filter-options.js')
            },
            searchbar: {
                textSearchbar: 'Pesquisar',
                iconSearchbar: 'fa fa-search',
                filter: [{
                    prop: 'nome',
                    field: 'nome',
                    operator: 'contains'
                }]
            }
        };

        self.gridHeaderOptions = {
            options: [{
                text: 'Novo',
                icon: 'fa fa-plus',
                action: addNoteAction,
                hideNavMobile: true
            },
            {
                text: 'Excluir',
                icon: 'fa fa-remove',
                action: excludeNoteAction,
                needSelectRow: true
            },
            {
                text: 'Abrir',
                icon: 'fa fa-expand',
                action: detailNoteAction,
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
        $state.go('app.notes.detail.dashboard', {
            id: selected._id
        });
    }

    this.open = function (_id) {
        $state.go('app.notes.detail.dashboard', {
            id: _id
        });
    };

    // Header Actions
    function addNoteAction() {
        $state.go('app.notes.register');
    }

    function detailNoteAction(selectedNotes) {
        $state.go('app.notes.detail.dashboard', {
            id: selectedNotes[0]._id
        });
    }

    function excludeNoteAction(selectedNotes) {
        nddConfirmDialogService.showDialog({
            title: 'Confirmar Exclusão',
            messageText: 'Deseja realmente excluir ? Essa ação não pode ser desfeita.',
            buttonConfirmText: 'Confirmar',
            buttonCancelText: 'Cancelar'
        }, function () {
            deleteOneByOne(selectedNotes);
        });
    }

    // private methods
    function deleteOneByOne(selectedNotes) {
        kendo.ui.progress(grid, true);
        noteService.delete(selectedNotes[0]._id).then(function (data) {
            selectedNotes.splice(0, 1);
            if (selectedNotes.length > 0) {
                deleteOneByOne(selectedNotes);
            } else {
                kendo.ui.progress(grid, false);
                nddKendoGridApiService.reload('notesGrid');
            }
        }, onDeleteError);
    }

    function onDeleteError() {
        alert('Erro ao excluir !!');
        kendo.ui.progress(grid, false);
    }
}