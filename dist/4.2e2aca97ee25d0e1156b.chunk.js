webpackJsonp([4],{206:function(t,e,r){"use strict";r(198);var i=angular.module("customersModule",[r(18),r(199),"uiSwitch",r(200),r(201),r(202),r(197),r(203),r(204),r(254)]);i.component("customersList",r(256)).component("customersCreate",r(260)).component("customersForm",r(263)).component("customerDetail",r(266)).component("customerDashboard",r(269)),t.exports=i.name},214:function(t,e,r){"use strict";t.exports=function(){this.id=0,this.name="",this.email="",this.isActivated=!0,this.fiscalType="",this.ficalCode=0}},215:function(t,e,r){"use strict";t.exports=[{value:"0",description:"Individual"},{value:"1",description:"Empresarial"}]},254:function(t,e,r){"use strict";var i=angular.module("customers",[r(39),r(19)]);i.factory("customersService",r(255)),t.exports=i.name},255:function(t,e,r){"use strict";t.exports=function(t,e,r){return{getAllCustomers:function(r){return e.get(t.apiUrl+"customers"+query).then(function(t){return t.data.items})},getById:function(r){return e.get(t.apiUrl+"customers/"+r).then(function(t){return t.data})},addCustomer:function(r){return e.post(t.apiUrl+"customers",r).then(function(t){return t.status})},removeCustomer:function(r){return e.delete(t.apiUrl+"customers/"+r).then(function(t){return t.status})},editCustomer:function(r){return e.put(t.apiUrl+"customers",JSON.stringify(r)).then(function(t){return t.status})}}},t.exports.$inject=["appConfig","$http","nddQueryGeneratorFactory"]},256:function(t,e,r){"use strict";t.exports={template:r(257),controller:r(258)}},257:function(t,e){t.exports='<section class="content__grid content__grid--full">\r\n    <ndd-kendo-grid id="customersGrid"\r\n        kendo-grid-options="$ctrl.kendoGridOptions"\r\n        kendo-grid-options-header="$ctrl.gridHeaderOptions">\r\n    </ndd-kendo-grid>\r\n</section>'},258:function(t,e,r){"use strict";(function(e){t.exports=function(t,i,n,o,s){function a(){i.go("app.customers.register")}function c(t){i.go("app.customers.detail.dashboard",{id:t[0].id})}function l(t){o.showDialog({title:"Confirmar Exclusão",messageText:"Deseja realmente excluir ? Essa ação não pode ser desfeita.",buttonConfirmText:"Confirmar",buttonCancelText:"Cancelar"},function(){d(t)})}function d(e){kendo.ui.progress(u,!0),t.removeCustomer(e[0].id).then(function(t){e.splice(0,1),e.length>0?d(e):(kendo.ui.progress(u,!1),n.reload("customersGrid"))},m)}function m(){alert("Erro ao excluir !!"),kendo.ui.progress(u,!1)}var u,f=this,p=new window.kendo.data.DataSource({type:"odata-v4",transport:{read:{url:s.apiUrl+"customers"}},schema:{data:"items",total:"count",aggregates:"aggregates",model:{Id:"id",fields:{Id:{type:"number"},Name:{type:"string"},Email:{type:"string"},FicalCode:{type:"string"},Status:{type:"string"},TypeFical:{type:"string"}}}},pageSize:10,allowUnsort:!0,serverPaging:!0,serverFiltering:!0,serverSorting:!0});this.$onInit=function(){u=e("#customersGrid #grid"),f.kendoGridOptions={dataSource:p,selectable:"multiple, row",checkbox:!0,pageable:{refresh:!0,pageSizes:!0,buttonCount:5,messages:{display:"Exibindo {0}-{1} from {2} itens",itemsPerPage:"Itens por página",empty:"Não há itens para exibir",allPages:"Todos"}},resizable:!0,columns:[{field:"id",title:"Id",width:60},{field:"name",title:"Nome",template:'<a class="ndd-kendo-grid__link" ng-click="$parent.$parent.$ctrl.open(#:id#)">#:name#</a>'},{field:"fiscalCode",title:"Código Fiscal"},{field:"email",title:"E-mail"},{field:"fiscalType",title:"Tipo Fical"},{field:"isActivated",title:"Status",template:'<span>#:isActivated ? "Ativo": "Desativado"#</span>'}]},f.gridFilterOptions={advanced:{columns:r(259)},searchbar:{textSearchbar:"Pesquisar",iconSearchbar:"fa fa-search",filter:[{prop:"name",field:"name",operator:"contains"}]}},f.gridHeaderOptions={options:[{text:"Novo",icon:"fa fa-plus",action:a,hideNavMobile:!0},{text:"Excluir",icon:"fa fa-remove",action:l,needSelectRow:!0},{text:"Abrir",icon:"fa fa-expand",action:c,needSelectRow:!0,needUniqueRow:!0}],responsive:{medium:{textAction:"Ações",textIcon:"fa fa-check"},optionsIcon:"ndd ndd-ellipses"}}},this.open=function(t){i.go("app.customers.detail.dashboard",{id:t})}},t.exports.$inject=["customersService","$state","nddKendoGridApiService","nddConfirmDialogService","appConfig"]}).call(e,r(2))},259:function(t,e,r){"use strict";t.exports=[{description:"Nome",value:"name",type:"string",sensitive:!1},{description:"E-mail",value:"email",type:"string"},{description:"Código Fiscal",value:"fiscalCode",type:"int"},{description:"Status",value:"isActivated",type:"bool"},{description:"Tipo",value:"ficalType",type:"string"}]},260:function(t,e,r){"use strict";t.exports={template:r(261),controller:r(262)}},261:function(t,e,r){t.exports='<div class="ndd-entity-editor__header">\r\n    <titlebar titlebar-title="$ctrl.title" titlebar-icon="\'fa fa-user\'">\r\n        <titlebar-info>\r\n            <titlebar-info-item titlebar-info-text="$ctrl.subtitle"></titlebar-info-item>\r\n        </titlebar-info>\r\n    </titlebar>\r\n</div>\r\n<div class="ndd-entity-editor__content">\r\n    <img ng-if="$ctrl.isLoading" class="form-utils__spinner" src="'+r(196)+'" alt="">        \r\n    <div class="ndd-entity-editor__form-content">\r\n        <div class="row">\r\n            <div class="col-sm-6">\r\n                <customers-form get-data="$ctrl.formGetData" get-form="$ctrl.getForm"></customers-form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="ndd-entity-editor__form-footer">\r\n        <button ng-click="$ctrl.save()" class="ndd-button ndd-button--highlighted" type="button">Salvar</button>\r\n        <button ng-click="$ctrl.cancel()" class="ndd-button" type="button">Cancelar</button>\r\n    </div>\r\n</div>'},262:function(t,e,r){"use strict";t.exports=function(t,e,i,n,o){var s=this;r(214);this.$onInit=function(){s.title="Cadastrar Cliente",s.subtitle="Preencha os campos abaixo para para cadastrar um novo cliente"},this.cancel=function(){e.go("app.customers.list")},this.save=function(){var t=s.getForm();if(t.$invalid)return o.setDirty(t),void o.setTouched(t);var r=s.formGetData();s.isLoading=!0,i.addCustomer(r).then(function(){s.isLoading=!1,n.showDialog({title:"Cliente foi cadastrado.",messageText:"Cliente "+r.name+" cadastrado (a) com sucesso.",buttonConfirmText:"Ir para clientes.",hideCancel:!0,showClose:!1,closeByDocument:!1,closeByEscape:!1},function(){e.go("app.customers.list")})},function(){s.isLoading=!1})}},t.exports.$inject=["$scope","$state","customersService","nddConfirmDialogService","formUtilsService"]},263:function(t,e,r){"use strict";t.exports={template:r(264),controller:r(265),bindings:{customer:"<",getData:"=?",getForm:"=?"}}},264:function(t,e){t.exports='<form name="formCustomers" class="form" novalidate>\r\n    <label class="form__label-description">Nome</label>\r\n    <input type="text" name="name" ng-model="$ctrl.customer.name" class="form__field" required placeholder="Nome do cliente"\r\n        autocomplete="off" ng-class="{\'form__field--invalid\': formCustomers.name.$invalid && formCustomers.name.$dirty}">\r\n    <br>\r\n    <div ng-messages="formCustomers.name.$error" role="alert">\r\n        <div class="form__message form__message--error" ng-show="formCustomers.name.$dirty" ng-message="required">É preciso um nome para o cliente</div>\r\n    </div>\r\n    <br>\r\n    <label class="form__label-description">Código Fiscal</label>\r\n    <input type="number" name="fiscalCode" ng-model="$ctrl.customer.fiscalCode" required class="form__field" placeholder="Código Fiscal"\r\n        autocomplete="off" ng-class="{\'form__field--invalid\': formCustomers.fiscalCode.$invalid && !formCustomers.email.$pristine && formCustomers.fiscalCode.$touched}"><br>\r\n    <div ng-messages="formCustomers.fiscalCode.$error" role="alert">\r\n        <div class="form__message form__message--error" ng-show="formCustomers.fiscalCode.$dirty" ng-message="required">É preciso um código fiscal para um clinte.</div>\r\n    </div>\r\n    <br>\r\n    <label class="form__label-description">Email</label>\r\n    <input type="email" name="email" ng-model="$ctrl.customer.email" required class="form__field" placeholder="Email" autocomplete="off"\r\n        ng-class="{\'form__field--invalid\': formCustomers.email.$invalid && !formCustomers.email.$pristine && formCustomers.email.$touched}"><br>\r\n    <div ng-messages="formCustomers.email.$error" role="alert">\r\n        <div class="form__message form__message--error" ng-show="formCustomers.email.$dirty" ng-message="required">É preciso um email para o cliente.</div>\r\n        <div class="form__message form__message--error" ng-show="!formCustomers.email.$error.required && formCustomers.email.$touched"\r\n            ng-message="email">Email Inválido.</div>\r\n    </div>\r\n    <br>\r\n    <label class="form__label-description">Tipo Fiscal</label>\r\n    <select ng-options="option.value as option.description for option in $ctrl.fiscalTypes" ng-model="$ctrl.customer.fiscalType"\r\n        class="form__field" name="fiscalType" required ng-class="{\'form__field--invalid\': formCustomers.fiscalType.$invalid && formCustomers.fiscalType.$dirty}"></select>\r\n    <div ng-messages="formCustomers.fiscalType.$error" role="alert">\r\n        <div ng-show="formCustomers.fiscalType.$invalid && formCustomers.fiscalType.$dirty" class="form__message form__message--error">O tipo é obrigatório</div>\r\n    </div>\r\n    <br>\r\n    <switch id="enabled" name="status" ng-model="$ctrl.customer.isActivated" class="green"></switch>\r\n    <label class="form__label-description form__label-description--switch">{{ $ctrl.customer.isActivated ? \'Ativo\' : \'Desativado\' }}</label>\r\n</form>'},265:function(t,e,r){"use strict";t.exports=function(t){var e=this,i=r(214);e.$onInit=function(){e.customer=new i,e.fiscalTypes=r(215),e.getData=function(){return e.customer},e.getForm=function(){return t.formCustomers}},this.$onChanges=function(t){t.customer&&t.customer.currentValue&&(e.customer=angular.copy(t.customer.currentValue))}},t.exports.$inject=["$scope"]},266:function(t,e,r){"use strict";t.exports={template:r(267),controller:r(268)}},267:function(t,e){t.exports='<div class="ndd-entity-editor__header">\r\n    <titlebar titlebar-title="$ctrl.customer.name" titlebar-icon="\'fa fa-user\'">\r\n        <titlebar-info>\r\n            <titlebar-info-item titlebar-info-text="$ctrl.customer.email" titlebar-info-icon="\'fa fa-envelope-o\'"> </titlebar-action-item>\r\n        </titlebar-info>\r\n        <titlebar-action>\r\n            <titlebar-action-item titlebar-action-text="\'Excluir\'" ng-click="$ctrl.remove()"  titlebar-action-icon="\'fa fa-trash\'"></titlebar-action-item>\r\n            <titlebar-action-item ui-sref="app.customers.list" titlebar-action-icon="\'fa fa-close\'"></titlebar-action-item>        \r\n        </titlebar-action>\r\n    </titlebar>\r\n    <tabs-bar options="$ctrl.tabOptions"></tabs-bar>\r\n</div>\r\n<div class="ndd-entity-editor__content">\r\n    <ui-view></ui-view>\r\n</div>'},268:function(t,e,r){"use strict";t.exports=function(t,e,r,i,n,o,s){function a(){d.isLoading=!0,i.removeCustomer(d.customer.id).then(function(t){s.showDialog({title:"Operação realizada",messageText:"Cliente excluído com sucesso !",buttonConfirmText:"OK",hideCancel:!0},function(){r.go("app.customers.list")})},function(){d.isLoading=!1,o.show({title:"Operação não realizada",messageText:"Erro ao realizar operação",buttonOk:"OK"})})}function c(){i.getById(e.id).then(l)}function l(r){d.customer=r;var i={text:r.name,sref:"app.customers.detail.dashboard",params:{id:e.id}};d.api={customer:r,refresh:c},n.setOptions(t,"app.customers",i)}var d=this;d.tabOptions=[{state:"app.customers.detail.dashboard",text:"Dados Cadastrais"}],d.$onInit=function(){c()},this.redirectToDash=function(){r.go("app.customers.detail.dashboard",{id:e.id,edit:!0})},this.remove=function(){s.showDialog({title:"Confirmação de Exclusão",messageText:"Deseja realmente excluir ? Essa operação não pode ser desfeita.",buttonConfirmText:"Remover",buttonCancelText:"Cancelar"},a)}},t.exports.$inject=["$scope","$stateParams","$state","customersService","breadcrumbService","nddAlert","nddConfirmDialogService"]},269:function(t,e,r){"use strict";t.exports={template:r(270),controller:r(271),bindings:{api:"<"}}},270:function(t,e,r){t.exports='<div class="ndd-entity-editor__form-content">\r\n    <div class="row" ng-if="!$ctrl.isEditing && !$ctrl.isLoading">\r\n        <div class="col-sm-6">\r\n            <h4 class="ndd-entity-editor__form-title">DADOS CADASTRAIS</h4>\r\n            <div class="col-sm-12 ndd-entity-editor__form-group">\r\n                <span class="ndd-entity-editor__form-label">Nome</span>\r\n                <br>\r\n                <span class="ndd-entity-editor__form-data" ng-bind="$ctrl.customer.name"></span>\r\n            </div>\r\n            <div class="col-sm-6 ndd-entity-editor__form-group">\r\n                <span class="ndd-entity-editor__form-label">Identificação</span>\r\n                <br>\r\n                <span class="ndd-entity-editor__form-data" ng-bind="$ctrl.customer.id"></span>\r\n            </div>\r\n            <div class="col-sm-6 ndd-entity-editor__form-group">\r\n                <span class="ndd-entity-editor__form-label">Email</span>\r\n                <br>\r\n                <span class="ndd-entity-editor__form-data" ng-bind="$ctrl.customer.email"></span>\r\n            </div>\r\n            <div class="col-sm-6 ndd-entity-editor__form-group">\r\n                <span class="ndd-entity-editor__form-label">Ativo</span>\r\n                <br>\r\n                <span class="ndd-entity-editor__form-data" ng-bind="$ctrl.customer.isActivated"></span>\r\n            </div>\r\n            <div class="col-sm-6 ndd-entity-editor__form-group">\r\n                <span class="ndd-entity-editor__form-label">Tipo Fiscal</span>\r\n                <br>\r\n                <span class="ndd-entity-editor__form-data" ng-bind="$ctrl.customer.fiscalType"></span>\r\n            </div>\r\n            <div class="col-sm-6 ndd-entity-editor__form-group">\r\n                <span class="ndd-entity-editor__form-label">Código Fiscal</span>\r\n                <br>\r\n                <span class="ndd-entity-editor__form-data" ng-bind="$ctrl.customer.fiscalCode"></span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="row" ng-show="$ctrl.isEditing && !$ctrl.isLoading">\r\n        <div class="col-sm-6">\r\n            <customer-form customer="$ctrl.customer" get-data="$ctrl.formGetData" get-form="$ctrl.getForm"></customer-form>\r\n        </div>\r\n    </div>\r\n    <img ng-if="$ctrl.isLoading" class="form-utils__spinner" src="'+r(196)+'" alt="">\r\n</div>\r\n<div class="ndd-entity-editor__form-footer">\r\n    <button ng-if="$ctrl.isEditing" ng-click="$ctrl.save()" class="ndd-button ndd-button--highlighted" type="button">Salvar</button>\r\n    <button ng-if="!$ctrl.isEditing" ng-click="$ctrl.edit()" class="ndd-button ndd-button--highlighted" type="button">Editar</button>\r\n    <button ng-click="$ctrl.cancel()" class="ndd-button" type="button">Cancelar</button>\r\n</div>'},271:function(t,e,r){"use strict";t.exports=function(t,e,i,n,o){function s(){a.isLoading=!1,o.show({title:"Operação não realizada",messageText:"Erro ao realizar operação",buttonOk:"OK"})}var a=this;a.isLoading=!0,this.$onInit=function(){a.fiscalTypes=r(215)},this.$onChanges=function(t){t.api&&t.api.currentValue&&(a.isLoading=!1,a.api=angular.copy(a.api),a.customer=a.api.customer)},this.edit=function(){a.isEditing=!0},this.cancel=function(){a.isEditing?a.isEditing=!1:e.go("app.customers.list")},this.save=function(){var t=a.getForm();if(t.$invalid)return n.setDirty(t),void n.setTouched(t);var e=a.formGetData();a.isLoading=!0,i.editCustomer(e).then(function(){a.isLoading=!0,a.isEditing=!1,n.setPristine(t),a.api.refresh()},s)}},t.exports.$inject=["$scope","$state","customersService","formUtilsService","nddAlert"]}});