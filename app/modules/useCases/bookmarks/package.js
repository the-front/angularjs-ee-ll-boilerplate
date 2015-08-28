!function(){"use strict";define("shared/fend/input-utils/module",["require","angular"],function(e){var t=e("angular");return t.module("fend.input.utils",[])}),define("shared/fend/input-utils/factories/input.focus",["require","../module"],function(e){function t(e){function t(e){var t=o[e];return t?t:(t=new s(e),o[e]=t,t)}var s=function(){function t(e){return"string"==typeof e||e instanceof String}function s(){r=null,l=null,o()}function o(){for(var e=0,t=a.length;t>e;e++)i[a[e]]=!1}function n(){o(),i[l]=!0,r=l}var i,a,r=null,l=null,c=function(e){this.classInfo="InputFocus for: "+e},u=c;return u.prototype.config=function(e,t){i=e,a=t,s()},u.prototype.setFocus=function(s,o){t(s)&&(o=o||100,r!==s&&(l=s,e(n,o)))},u.prototype.focusReset=function(){s()},u}(),o={},n={get:t};return n}var s=e("../module");s.factory("InputFocusFactory",t),t.$inject=["$timeout"]}),define("shared/fend/input-utils/directives/input.focus",["require","../module"],function(e){function t(){function e(e,t,s,o){e.$watch(s.fendFocus,function(e,s){0!==e&&e&&t[0].focus()})}var t={restrict:"A",link:e};return t}var s=e("../module");s.directive("fendFocus",t)}),define("shared/fend/input-utils/package",["require","./module","./factories/input.focus","./directives/input.focus"],function(e){var t=e("./module");return e("./factories/input.focus"),e("./directives/input.focus"),t}),define("shared/fend/pagination/module",["require","angular"],function(e){var t=e("angular");return t.module("fend.pagination",[])}),define("shared/fend/pagination/factory",["require","./module"],function(e){function t(){function e(e){var o=s[e];return o?o:(o=new t(e),s[e]=o,o)}var t=function(){function e(e){function t(){this.pageSize=e||10,this.count=0,this.nextPage=1,this.lastPage=0,this.lastPageSize=0,this.totalPages=0,this.ts=(new Date).getTime()}return new t}var t=function(t){this.classInfo="Pagination for: "+t,this.metainf=e()},s=t;return s.prototype.resetPageSize=function(t){this.metainf=e(t)},s.prototype.getPageSize=function(){return this.metainf.pageSize},s.prototype.setNextPage=function(e){this.metainf.nextPage=parseInt(e)},s.prototype.getNextPage=function(){return this.metainf.nextPage},s.prototype.updateMetainf=function(e,t,s,o){this.metainf.count=parseInt(e),this.metainf.lastPageSize=parseInt(t),this.metainf.lastPage=parseInt(s),this.metainf.totalPages=parseInt(o)},s.prototype.addCheck=function(){var e=this.metainf.count%this.getPageSize()===0;e?this.setNextPage(this.metainf.totalPages+1):this.setNextPage(this.metainf.totalPages)},s.prototype.removeCheck=function(){if(1==this.metainf.lastPageSize){var e=this.metainf.totalPages-1;0>=e&&(e=0),this.setNextPage(e)}},s}(),s={},o={get:e};return o}var s=e("./module");s.factory("PaginationFactory",t)}),define("shared/fend/pagination/package",["require","./module","./factory"],function(e){var t=e("./module");return e("./factory"),t}),define("app/modules/useCases/bookmarks/module",["require","angular","angularResource","uiRouter","uiBootstrap","shared/fend/input-utils/package","shared/fend/pagination/package"],function(e){var t=e("angular");return e("angularResource"),e("uiRouter"),e("uiBootstrap"),t.module("bookmarks",["ngResource","ui.router","ui.bootstrap",e("shared/fend/input-utils/package").name,e("shared/fend/pagination/package").name])}),define("app/modules/useCases/bookmarks/resources/rest",["require","../module"],function(e){function t(e){var t=e("rest/bookmarks/:id",{id:""},{update:{method:"PUT"}});return t}var s=e("../module");s.factory("BookmarksResource",t),t.$inject=["$resource"]}),define("app/modules/useCases/bookmarks/controllers/edit",["require","../module","../resources/rest"],function(e){function t(e,t,s,o,n){function i(){c.bookmark.$update({id:o.id},function(t){e.$emit("bookmarks:update:event","updated")})}function a(){c.showConfirm=!0}function r(){c.showConfirm=!1,n.focusReset(),n.setFocus("focusBookmarkNameInput")}function l(){c.bookmark.$delete({id:o.id},function(t){c.showConfirm=!1,e.$emit("bookmarks:remove:event","removed")})}var c=this;c.title="Edit Bookmark : "+o.id,c.bookmark=void 0,c.showConfirm=!1,c.save=i,c.remove=a,c.cancelRemove=r,c.destroy=l;var u="BookmarksEditCtrl";n=n.get(u),n.config(t,["focusBookmarkNameInput"]),s.get({id:o.id},function(e){c.bookmark=e,n.setFocus("focusBookmarkNameInput",200)})}var s=e("../module");e("../resources/rest"),s.controller("BookmarksEditCtrl",t),t.$inject=["$rootScope","$scope","BookmarksResource","$stateParams","InputFocusFactory"]}),define("app/modules/useCases/bookmarks/controllers/list",["require","../module","../resources/rest"],function(e){function t(e,t,s,o,n,i,a){function r(){s.path("/bookmarks")}function l(e){var t=/^\s*$/;return null===e||t.test(e)}function c(){S.clearFilter(),S.showOptions&&S.showOptionsBtnClick(),(S.showFilter||S.showFilterBtnActive)&&S.showFilterBtnClick(),S.showFilterBtn=m(),S.showPagination=!0,S.showFilter=!1,S.showFilterBtnActive=!1}function u(e){o.get({page:e,size:n.getPageSize()},function(e){S.result=e,S.currentPage=e.page,n.updateMetainf(e.count,e.data.length,e.page,e.pages),c()})}function p(){S.showOptions=!S.showOptions,S.optionsBtnLabel=(S.showOptions?"Hide":"Show")+" Options",S.showOptions?(S.showFilter=S.showFilterBtnActive,S.showFilter?i.setFocus("focusFilterSearchInput"):i.setFocus("focusPageSizeInput")):(S.showFilter&&l(S.filter.search)&&S.showFilterBtnClick(),S.showFilter=!1,i.focusReset())}function m(){return n.getPageSize()>=w.showFilterBtnMinlength&&n.metainf.lastPageSize>=w.showFilterBtnMinlength}function d(){S.showFilter=S.showFilterBtnActive=!S.showFilter,S.filterBtnLabel=(S.showFilter?"Hide":"Show")+" filter",S.showFilter||S.clearFilter(),S.showPagination=!S.showFilter,S.showFilter?i.setFocus("focusFilterSearchInput"):i.setFocus("focusPageSizeInput")}function g(){S.filter={search:""}}function v(){S.currentPage!=S.result.page&&(n.setNextPage(S.currentPage),u(n.getNextPage()))}function f(e){var t=!1;return t=void 0===e||null===e||e===n.getPageSize()||e<S.pageMinSize||e>S.pageMaxSize}function h(){S.showFilter&&S.showFilterBtnClick(),n.resetPageSize(S.pageSize),S.paginationPageSize=n.getPageSize(),u(n.getNextPage())}function k(){S.updatePageSizeInvalid(S.pageSize)||S.updatePageSize()}var b="BookmarksListCtrl";i=i.get(b),n=n.get(b);var w={pageMinSize:2,pageMaxSize:50,showFilterBtnMinlength:5},S=this;S.result=void 0,S.currentPage=void 0,S.showOptions=!1,S.optionsBtnLabel="Show Options",S.showOptionsBtnClick=p,S.filter={search:""},S.showFilter=!1,S.showFilterBtn=!1,S.showFilterBtnActive=!1,S.filterBtnLabel="Show filter",S.showFilterBtnClick=d,S.clearFilter=g,S.showPagination=!0,S.pageSize=n.getPageSize(),S.pageMinSize=w.pageMinSize,S.pageMaxSize=w.pageMaxSize,S.paginationItemsSize=5,S.paginationPageSize=n.getPageSize(),S.currentPage=1,S.pageChanged=v,S.updatePageSizeInvalid=f,S.updatePageSize=h,S.updatePageSizeFormSubmit=k,e.$on("bookmarks:add:event",function(e,t){e.preventDefault(),e.stopPropagation(),a.debug("bookmarks:add:event - "+t),n.addCheck(),r()}),e.$on("bookmarks:update:event",function(e,t){e.preventDefault(),e.stopPropagation(),a.debug("bookmarks:update:event - "+t),r()}),e.$on("bookmarks:remove:event",function(e,t){e.preventDefault(),e.stopPropagation(),a.debug("bookmarks:remove:event - "+t),n.removeCheck(),r()}),i.config(t,["focusPageSizeInput","focusFilterSearchInput"]),u(n.getNextPage())}var s=e("../module");e("../resources/rest"),s.controller("BookmarksListCtrl",t),t.$inject=["$rootScope","$scope","$location","BookmarksResource","PaginationFactory","InputFocusFactory","$log"]}),define("app/modules/useCases/bookmarks/controllers/new",["require","../module","../resources/rest"],function(e){function t(e,t,s,o){function n(){i.bookmark.$save(function(t){e.$emit("bookmarks:add:event","added")})}var i=this;i.title="New Bookmark",i.bookmark=new s({id:0,name:"",description:"",url:""}),i.save=n;var a="BookmarksNewCtrl";o=o.get(a),o.config(t,["focusBookmarkNameInput"]),o.setFocus("focusBookmarkNameInput",200)}var s=e("../module");e("../resources/rest"),s.controller("BookmarksNewCtrl",t),t.$inject=["$rootScope","$scope","BookmarksResource","InputFocusFactory"]}),define("app/modules/useCases/bookmarks/resources/search",["require","../module"],function(e){function t(e){var t=e("rest/bookmarks/search/:name");return t}var s=e("../module");s.factory("BookmarksSearchResource",t),t.$inject=["$resource"]}),define("app/modules/useCases/bookmarks/controllers/search",["require","../module","../resources/search"],function(e){function t(e,t,s,o,n){function i(e){var t=/^\s*$/;return null===e||t.test(e)}function a(){b.clearFilter(),b.showOptions&&b.showOptionsBtnClick(),(b.showFilter||b.showFilterBtnActive)&&b.showFilterBtnClick(),b.showFilterBtn=c(),b.showPagination=!0,b.showFilter=!1,b.showFilterBtnActive=!1,o.setFocus("focusSearchInput")}function r(e){i(b.searchName)||t.get({name:b.searchName,page:e,size:s.getPageSize()},function(e){b.result=e,b.currentPage=e.page,s.updateMetainf(e.count,e.data.length,e.page,e.pages),a()})}function l(){b.showOptions=!b.showOptions,b.optionsBtnLabel=(b.showOptions?"Hide":"Show")+" Options",b.showOptions?(b.showFilter=b.showFilterBtnActive,b.showFilter?o.setFocus("focusFilterSearchInput"):o.setFocus("focusPageSizeInput")):(b.showFilter&&i(b.filter.search)&&b.showFilterBtnClick(),b.showFilter=!1,o.setFocus("focusSearchInput"))}function c(){return s.getPageSize()>=k.showFilterBtnMinlength&&s.metainf.lastPageSize>=k.showFilterBtnMinlength}function u(){b.showFilter=b.showFilterBtnActive=!b.showFilter,b.filterBtnLabel=(b.showFilter?"Hide":"Show")+" filter",b.showFilter||b.clearFilter(),b.showPagination=!b.showFilter,b.showFilter?o.setFocus("focusFilterSearchInput"):o.setFocus("focusPageSizeInput")}function p(){b.filter={search:""}}function m(){b.currentPage!=b.result.page&&(s.setNextPage(b.currentPage),r(s.getNextPage()))}function d(e){var t=!1;return t=void 0===e||null===e||e===s.getPageSize()||e<b.pageMinSize||e>b.pageMaxSize}function g(){b.showFilter&&b.showFilterBtnClick(),s.resetPageSize(b.pageSize),b.paginationPageSize=s.getPageSize(),r(s.getNextPage())}function v(){b.updatePageSizeInvalid(b.pageSize)||b.updatePageSize()}function f(){s.resetPageSize(b.pageSize),r(s.getNextPage())}var h="BookmarksSearchCtrl";o=o.get(h),s=s.get(h);var k={pageMinSize:2,pageMaxSize:50,showFilterBtnMinlength:5},b=this;b.result=void 0,b.currentPage=void 0,b.showOptions=!1,b.optionsBtnLabel="Show Options",b.showOptionsBtnClick=l,b.filter={search:""},b.showFilter=!1,b.showFilterBtn=!1,b.showFilterBtnActive=!1,b.filterBtnLabel="Show filter",b.showFilterBtnClick=u,b.clearFilter=p,b.showPagination=!0,b.pageSize=s.getPageSize(),b.pageMinSize=k.pageMinSize,b.pageMaxSize=k.pageMaxSize,b.paginationItemsSize=5,b.paginationPageSize=s.getPageSize(),b.currentPage=1,b.pageChanged=m,b.updatePageSizeInvalid=d,b.updatePageSize=g,b.updatePageSizeFormSubmit=v,b.doSearch=f,o.config(e,["focusSearchInput","focusPageSizeInput","focusFilterSearchInput"]),o.setFocus("focusSearchInput",200)}var s=e("../module");e("../resources/search"),s.controller("BookmarksSearchCtrl",t),t.$inject=["$scope","BookmarksSearchResource","PaginationFactory","InputFocusFactory","$log"]}),define("app/modules/useCases/bookmarks/states",["require","./module"],function(e){function t(e,t){t.when("/bookmarks","/bookmarks/list"),e.state("bookmarks",{"abstract":!0,url:"/bookmarks",views:{master:{templateUrl:"app/core/main/templates/layout.html"}}}).state("bookmarks.list",{url:"/list",views:{"content@bookmarks":{templateUrl:"app/modules/useCases/bookmarks/templates/list.html",controller:"BookmarksListCtrl",controllerAs:"vm"}}}).state("bookmarks.search",{url:"/search",views:{"content@bookmarks":{templateUrl:"app/modules/useCases/bookmarks/templates/search.html",controller:"BookmarksSearchCtrl",controllerAs:"vm"}}}).state("bookmarks.new",{url:"/new",views:{"content@bookmarks":{templateUrl:"app/modules/useCases/bookmarks/templates/form.html",controller:"BookmarksNewCtrl",controllerAs:"vm"}}}).state("bookmarks.edit",{url:"/edit/:id",views:{"content@bookmarks":{templateUrl:"app/modules/useCases/bookmarks/templates/form.html",controller:"BookmarksEditCtrl",controllerAs:"vm"}}})}var s=e("./module");s.config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}),define("app/modules/useCases/bookmarks/templatesCache",["require","./module"],function(e){function t(e){e.put("app/modules/useCases/bookmarks/templates/form.html",'<div class=container><div class=row><h4>{{vm.title}}</h4></div><div class=row><hr></div><div class=row><div class=container><form role=form name=bookmarkForm><div class=row ng-class="{\'has-error\': bookmarkForm.name.$invalid}"><div class=col-md-1><i ng-if=bookmarkForm.name.$error.required class="glyphicon glyphicon-pencil"></i><label for=nameInput>Name</label></div><div class=col-md-4><input class="form-control error" id=nameInput name=name ng-model=vm.bookmark.name fend-focus=focusBookmarkNameInput required></div></div><div class=row>&nbsp;</div><div class=row ng-class="{\'has-error\': bookmarkForm.url.$invalid}"><div class=col-md-1><i ng-if=bookmarkForm.url.$error.required class="glyphicon glyphicon-pencil"></i><label for=urlInput>URL</label></div><div class=col-md-4><input type=url class=form-control id=urlInput name=url ng-model=vm.bookmark.url required></div></div><div class=row>&nbsp;</div><div class=row><label class=col-md-5 for=descriptionArea>Description</label></div><div class=row><div class=col-md-5><textarea class=form-control id=descriptionArea name=description ng-model=vm.bookmark.description></textarea></div></div><div class=row ng-if=!vm.showConfirm>&nbsp;</div><div class=row ng-if=!vm.showConfirm><div class=col-md-5><a href=#bookmarks class=btn id=cancelLinkBtn>Cancel</a> <button id=saveBtn ng-click=vm.save() ng-disabled="vm.isClean() || bookmarkForm.$invalid" class="btn btn-primary">Save</button> <button id=deleteConfirmBtn ng-click=vm.remove() ng-if=vm.bookmark.id class="btn btn-danger">Delete</button></div></div><div class="bs-callout bs-callout-danger" ng-if=vm.showConfirm><h4>Confirm</h4><p>Delete <code>{{vm.bookmark.name}}</code> bookmark?</p><button id=deleteBtn ng-click=vm.destroy() class="btn btn-danger">Delete</button> <button id=cancelBtn ng-click=vm.cancelRemove() class="btn btn-default">Cancel</button></div></form></div></div></div>'),e.put("app/modules/useCases/bookmarks/templates/list.html",'<div class=container><div class=row>&nbsp;</div><div class=row><ul class=list-inline><li><a href=#bookmarks/search><i class="glyphicon glyphicon-search"></i> Search</a></li><li>|</li><li><a href=#bookmarks/new><i class="glyphicon glyphicon-plus-sign"></i> New</a></li><li>&nbsp;</li><li><button id=optionsBtn type=button title={{vm.optionsBtnLabel}} ng-click=vm.showOptionsBtnClick() class="btn btn-sm btn-default" ng-class="{\'active\': vm.showOptions}"><i class="glyphicon glyphicon-wrench"></i> {{vm.optionsBtnLabel}}</button></li></ul></div><div class=row ng-show=vm.showOptions><span>&nbsp;&nbsp;&nbsp;&nbsp;</span> <span ng-if=vm.showFilterBtn><button id=filterBtn type=button title={{vm.filterBtnLabel}} ng-click=vm.showFilterBtnClick() class="btn btn-sm btn-default" ng-class="{\'active\': vm.showFilterBtnActive}"><i class="glyphicon glyphicon-filter"></i> {{vm.filterBtnLabel}}</button></span> <span>&nbsp;&nbsp;&nbsp;&nbsp;</span> <span ng-if=vm.showPagination><span ng-if="vm.result.pages > 1">Pages: <span class=badge>{{vm.result.pages}}</span> &nbsp;&nbsp;</span> <span ng-if="vm.result.count > 0">Total: <span class=badge>{{vm.result.count}}</span></span> <span class="visible-xs col-md-1">&nbsp;</span></span><div class="col-md-3 pull-right" ng-show=vm.showPagination><form name=updateSizeForm ng-submit=vm.updatePageSizeFormSubmit() role=form novalidate><div class="input-group input-group-sm"><span class=input-group-addon>Page Size</span> <input class=form-control type=number name=pageSize ng-model=vm.pageSize fend-focus=focusPageSizeInput min={{vm.pageMinSize}} max={{vm.pageMaxSize}} placeholder="min value 2"> <span class=input-group-btn><button ng-click=vm.updatePageSize() ng-disabled=vm.updatePageSizeInvalid(vm.pageSize) class="btn btn-default" type=button>Update</button></span></div><div><p id=pageSizeMessage ng-if="updateSizeForm.pageSize.$error.min || updateSizeForm.pageSize.$error.max" class=text-center>The value must be in range {{vm.pageMinSize}} to {{vm.pageMaxSize}}!</p></div></form></div></div><div class=row><span>&nbsp;</span></div><div class=row ng-include="\'app/modules/useCases/bookmarks/templates/table.html\'"></div><div class=row ng-if=vm.showPagination><div class=text-center ng-if="vm.result.pages > 1"><pagination ng-model=vm.currentPage max-size=vm.paginationItemsSize total-items=vm.result.count num-pages=vm.result.pages items-per-page=vm.paginationPageSize ng-change=vm.pageChanged() class=pagination-sm boundary-links=true rotate=false></pagination></div></div><div class=row ng-if=!vm.showPagination><p class=text-center ng-if=vm.filter.search><i class="glyphicon glyphicon-filter"></i> : {{vm.filter.search}}</p></div></div>'),e.put("app/modules/useCases/bookmarks/templates/search.html",'<div class=container><div class=row>&nbsp;</div><div class=row><div class=col-md-3><ul class=list-inline><li><a href=#bookmarks><i class="glyphicon glyphicon-chevron-left"></i> All Bookmarks</a></li><li><button id=optionsBtn type=button title={{vm.optionsBtnLabel}} ng-click=vm.showOptionsBtnClick() class="btn btn-sm btn-default" ng-class="{\'active\': vm.showOptions}"><i class="glyphicon glyphicon-wrench"></i> {{vm.optionsBtnLabel}}</button></li></ul></div><div class="col-md-6 col-md-offset-3"><form role=form name=searchForm ng-submit=vm.doSearch()><div class=input-group ng-class="{\'has-error\': searchForm.searchInput.$invalid}"><span class=input-group-addon><i class="glyphicon glyphicon-search"></i></span> <input class=form-control placeholder=Bookmark name=searchInput ng-model=vm.searchName fend-focus=focusSearchInput required> <span class=input-group-btn><button class="btn btn-default" ng-click=vm.doSearch() ng-disabled="vm.isClean() || searchForm.$invalid" type=button>Search</button></span></div></form></div></div><div class=visible-xs><span ng-if="vm.showOptions &#38;&#38; (vm.showFilterBtn || vm.result.count > 0)">&nbsp;</span></div><div class=row ng-show=vm.showOptions><span ng-if=vm.showFilterBtn><span>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</span> <button id=filterBtn type=button title={{vm.filterBtnLabel}} ng-click=vm.showFilterBtnClick() class="btn btn-sm btn-default" ng-class="{\'active\': vm.showFilterBtnActive}"><i class="glyphicon glyphicon-filter"></i> {{vm.filterBtnLabel}}</button></span> <span ng-if=vm.showPagination><span ng-if="vm.result.count > 0">&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</span> <span ng-if="vm.result.pages > 1">Pages: <span class=badge>{{vm.result.pages}}</span> &nbsp;&nbsp;</span> <span ng-if="vm.result.count > 0">Total: <span class=badge>{{vm.result.count}}</span></span> <span class="visible-xs col-md-1">&nbsp;</span></span><div class="col-md-3 pull-right" ng-show=vm.showPagination><form name=updateSizeForm ng-submit=vm.updatePageSizeFormSubmit() role=form novalidate><div class="input-group input-group-sm"><span class=input-group-addon>Page Size</span> <input class=form-control type=number name=pageSize ng-model=vm.pageSize fend-focus=focusPageSizeInput min={{vm.pageMinSize}} max={{vm.pageMaxSize}} placeholder="min value 2"> <span class=input-group-btn><button ng-click=vm.updatePageSize() ng-disabled=vm.updatePageSizeInvalid(vm.pageSize) class="btn btn-default" type=button>Update</button></span></div><div><p id=pageSizeMessage ng-if="updateSizeForm.pageSize.$error.min || updateSizeForm.pageSize.$error.max" class=text-center>The value must be in range {{vm.pageMinSize}} to {{vm.pageMaxSize}}!</p></div></form></div></div><div class=row><span>&nbsp;</span></div><div class=row ng-include="\'app/modules/useCases/bookmarks/templates/table.html\'"></div><div class=row ng-if=vm.showPagination><div class=text-center ng-if="vm.result.pages > 1"><pagination ng-model=vm.currentPage max-size=vm.paginationItemsSize total-items=vm.result.count num-pages=vm.result.pages items-per-page=vm.paginationPageSize ng-change=vm.pageChanged() class=pagination-sm boundary-links=true rotate=false></pagination></div></div><div class=row ng-if=!vm.showPagination><p class=text-center ng-if=vm.filter.search><i class="glyphicon glyphicon-filter"></i> : {{vm.filter.search}}</p></div></div>'),e.put("app/modules/useCases/bookmarks/templates/table.html",'<div class=row ng-if="!vm.showOptions &#38;&#38; !vm.showPagination &#38;&#38; vm.filter.search"><p class=text-center><i class="glyphicon glyphicon-filter"></i> : {{vm.filter.search}}</p></div><div ng-if=vm.showFilter><div class=input-group><span class=input-group-addon><i class="glyphicon glyphicon-filter"></i></span> <input class=form-control placeholder=Text ng-model=vm.filter.search fend-focus=focusFilterSearchInput> <span class=input-group-btn><button id=filterClearButton ng-click=vm.clearFilter() class="btn btn-default" type=button>Clear</button></span></div><div class=row>&nbsp;</div></div><div class=table-responsive><table class="table table-condensed"><thead><tr><th class=visible-xs></th><th>Name <i class="glyphicon glyphicon-new-window" title="Open in new window"></i></th><th>Description</th><th class=hidden-xs></th></tr></thead><tbody><tr ng-repeat="bookmark in vm.result.data | filter:vm.filter.search"><td class=visible-xs><a id=gotoedit_0 href=#bookmarks/edit/{{bookmark.id}}><i class="glyphicon glyphicon-pencil"></i></a></td><td><a href={{bookmark.url}} target=_blank>{{bookmark.name}}</a></td><td>{{bookmark.description}}</td><td class=hidden-xs><a id=gotoedit_1 href=#bookmarks/edit/{{bookmark.id}}><i class="glyphicon glyphicon-pencil"></i></a></td></tr></tbody></table></div>')}var s=e("./module");s.run(t),t.$inject=["$templateCache"]}),define("app/modules/useCases/bookmarks/package",["require","./module","./controllers/edit","./controllers/list","./controllers/new","./controllers/search","./resources/rest","./resources/search","./states","./templatesCache"],function(e){var t=e("./module");return e("./controllers/edit"),e("./controllers/list"),e("./controllers/new"),e("./controllers/search"),e("./resources/rest"),e("./resources/search"),e("./states"),e("./templatesCache"),t})}();