describe('Testing <%= helpers.capitalize( name ) %> List Controller', function() {

  function backendList(page, pageSize) {
    page = page || 1;
    pageSize = pageSize || 10;

    var objs = [];
    for(var i = 0, len = pageSize; i < len; i++) {
      objs.push({
        id: i,
        name: '<%= name %> ' + (i+1),
        description: '<%= name %> description ' + (i+1),
        url: 'http://google.com'
      });
    }

    httpBackend.when('GET', '<%= endpoint %>?page='+ page +'&size=' + pageSize)
      .respond(function(method, url, data) {

        data = {
          data: objs,
          count: objs.length,
          page: 1,
          pages: 1
        };

        return [200, angular.copy(data)];
      });
  }

  //----------------------------------------------------------------------------

  var location, vm, scope, rootScope, httpBackend, pagination;

  // excuted before each "it" is run
  beforeEach(function() {
    var ctrlName = '<%= helpers.capitalize( name ) %>ListCtrl';

    // load the module
    module('<%= name %>');

    // inject dependencies
    inject(function(
      $location, $controller,
      $rootScope, $httpBackend,
      PaginationFactory
    ) {
      scope = $rootScope.$new();

      vm = $controller(ctrlName, {
        $scope: scope
      });

      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;
      pagination = PaginationFactory.get(ctrlName);
    });

  });


  it('should be defined', function() {

    // assertions
    expect(vm).toBeDefined();

  });


  describe("event handlers", function() {

    beforeEach(function() {

      // arrange
      spyOn(location, 'path');

      backendList();

    });

    it("should handle '<%= name %>:add:event'", function() {

      // act
      rootScope.$emit('<%= name %>:add:event', 'added');

      // assertions
      expect(location.path).toHaveBeenCalledWith('/<%= route %>');

    });


    it("should handle '<%= name %>:update:event'", function() {

      // act
      rootScope.$emit('<%= name %>:update:event', 'updated');

      // assertions
      expect(location.path).toHaveBeenCalledWith('/<%= route %>');

    });


    it("should handle '<%= name %>:remove:event'", function() {

      // act
      rootScope.$emit('<%= name %>:remove:event', 'removed');

      // assertions
      expect(location.path).toHaveBeenCalledWith('/<%= route %>');

    });

  });


  describe("options", function() {

    it("should show", function() {

      // act
      vm.showOptionsBtnClick();

      // assertions
      expect(vm.showOptions).toBeTruthy();
      expect(vm.optionsBtnLabel).toEqual('Hide Options');

    });

    it("should show options and filter", function() {

      // act
      vm.showFilterBtnActive = true;
      vm.showOptionsBtnClick();

      // assertions
      expect(vm.showOptions).toBeTruthy();
      expect(vm.optionsBtnLabel).toEqual('Hide Options');

    });

    it("should hide", function() {

      // act
      vm.showOptions = true;
      vm.showOptionsBtnClick();

      // assertions
      expect(vm.showOptions).toBeFalsy();
      expect(vm.optionsBtnLabel).toEqual('Show Options');

    });

    it("should hide options and filter", function() {

      // act
      vm.filter = { search: '' };
      vm.showFilter = true;
      vm.showOptions = true;
      vm.showOptionsBtnClick();

      // assertions
      expect(vm.showOptions).toBeFalsy();
      expect(vm.optionsBtnLabel).toEqual('Show Options');

    });

  });


  describe("filter", function() {

    it("should show", function() {

      // act
      vm.showFilterBtnClick();

      // assertions
      expect(vm.showFilter).toBeTruthy();
      expect(vm.filterBtnLabel).toEqual('Hide filter');

    });

    it("should hide", function() {

      // act
      vm.showFilter = true;
      vm.showFilterBtnClick();

      // assertions
      expect(vm.showFilter).toBeFalsy();
      expect(vm.filterBtnLabel).toEqual('Show filter');

    });

  });


  describe("update page size", function() {

    it("should be valid", function() {

      // arrange
      vm.pageMinSize = 5;
      vm.pageMaxSize = 100;

      // act and assertions
      expect(vm.updatePageSizeInvalid( 11 )).toBeFalsy();
      expect(vm.updatePageSizeInvalid( 6 )).toBeFalsy();
      expect(vm.updatePageSizeInvalid( 99 )).toBeFalsy();

    });

    it("should be invalid", function() {

      // arrange
      vm.pageMinSize = 5;
      vm.pageMaxSize = 100;

      // act and assertions
      expect(vm.updatePageSizeInvalid( undefined )).toBeTruthy();
      expect(vm.updatePageSizeInvalid( null )).toBeTruthy();
      expect(vm.updatePageSizeInvalid( 10 )).toBeTruthy();
      expect(vm.updatePageSizeInvalid( 2 )).toBeTruthy();
      expect(vm.updatePageSizeInvalid( 200 )).toBeTruthy();

    });

  });


  describe("updatePageSize form", function() {

    it("should submit", function() {

      // arrange
      backendList();
      backendList(1, 11);
      vm.pageMinSize = 5;
      vm.pageMaxSize = 100;

      // act
      vm.pageSize = 11;
      vm.updatePageSizeFormSubmit();
      httpBackend.flush();

      // assertions
      expect(vm.currentPage).toEqual(1);
      expect(vm.result.data.length).toEqual(11);

    });

    it("should not submit", function() {

      // arrange
      vm.showFilter = true;
      vm.pageMinSize = 5;
      vm.pageMaxSize = 100;

      // act
      vm.pageSize = 200;
      vm.updatePageSizeFormSubmit();

      // assertions
      expect(vm.showFilter).toBeTruthy();

    });

  });


  describe("load data", function() {

    beforeEach(function() {

      // arrange
      backendList();

      // act
      httpBackend.flush();

    });

    it("should load first default page", function() {

      // assertions
      expect(vm.currentPage).toEqual(1);
      expect(vm.result.data.length).toEqual(10);

    });


    it("should update page size to 11", function() {

      var _pageSize = 11;

      // arrange
      backendList(1, _pageSize);

      // act
      vm.pageSize = _pageSize;
      vm.updatePageSize();
      httpBackend.flush();

      // assertions
      expect(vm.currentPage).toEqual(1);
      expect(vm.result.data.length).toEqual(_pageSize);

    });


    it("should update page size to 12 and hide filter", function() {

      var _pageSize = 12;

      // arrange
      backendList(1, _pageSize);
      vm.showFilter = true;

      // act
      vm.pageSize = _pageSize;
      vm.updatePageSize();
      httpBackend.flush();

      // assertions
      expect(vm.currentPage).toEqual(1);
      expect(vm.result.data.length).toEqual(_pageSize);
      expect(vm.showFilter).toBeFalsy();

    });


    it("should update page size to 13 and hide options", function() {

      var _pageSize = 13;

      // arrange
      backendList(1, _pageSize);
      vm.showFilterBtnActive = true;
      vm.showOptions = true;

      // act
      vm.pageSize = _pageSize;
      vm.updatePageSize();
      httpBackend.flush();

      // assertions
      expect(vm.currentPage).toEqual(1);
      expect(vm.result.data.length).toEqual(_pageSize);
      expect(vm.showFilter).toBeFalsy();

    });

  });


  describe("pagination", function() {

    it("should change page", function() {

      // arrange
      vm.result = {
        page: 1
      };

      vm.currentPage = 2;

      // act
      vm.pageChanged();

      // assertions
      expect(pagination.getNextPage()).toEqual(2);

    });

    it("should not change page", function() {

      // arrange
      vm.result = {
        page: 1
      };

      vm.currentPage = 1;

      // act
      vm.pageChanged();

      // assertions
      expect(pagination.getNextPage()).toEqual(1);

    });

  });


});
