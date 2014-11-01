angular.module('Spreadsheet.type', [
  'ui.router'
])

  .config(function ($stateProvider) {
    $stateProvider.state('types', {
      url: '/types',
      views: {
        'main': {
          controller: 'TypeCtrl',
          templateUrl: 'assets/js/type/type.tpl.html'
        }
      }
    });
  })

  .controller('TypeCtrl', function ($scope, $http) {
    $http.get('/api/types')
      .success(function (data) {
        $scope.types = data;
      });
  });