describe('Testing Main Controller', function() {

  var vm;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('core.main');

    // inject dependencies
    inject(function($controller) {

      vm = $controller('MainCtrl');

    });

  });


  it('should be defined', function() {

    // assertions
    expect(vm).toBeDefined();

  });

});
