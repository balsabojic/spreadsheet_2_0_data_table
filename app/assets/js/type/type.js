angular.module('Spreadsheet.type', [
  'ui.router'
])

  .config(function ($stateProvider) {
    $stateProvider.state('type', {
      url: '/type',
      views: {
        'main': {
          controller: 'TypeCtrl',
          templateUrl: 'assets/js/type/type.tpl.html'
        }
      }
    });
  })

  .controller('TypeCtrl', function ($scope) {
    $scope.samples = ['one', 'two', 'three'];
  });