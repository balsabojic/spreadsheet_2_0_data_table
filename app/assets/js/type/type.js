angular.module('Spreadsheet.type', [
  'Spreadsheet.services',
  'ui.router'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('types', {
        url: '/types',
        templateUrl: '/assets/js/type/type.tpl.html',
        controller: 'TypeCtrl'
      })
      .state('types.detail', {
        url: '/:id',
        controller: 'TypeDetailCtrl',
        templateUrl: '/assets/js/type/type.detail.tpl.html'
      });
  })
  .controller('TypeCtrl', function ($scope, $http) {
    $http.get('/api/types')
      .success(function (data) {
        $scope.types = data;
      });
  })
  .controller('TypeDetailCtrl', function ($scope, $http, $stateParams, InstanceService) {
    $scope.typeId = $stateParams.id;
    $http.get('/api/types/' + $scope.typeId)
      .success(function (data) {
        $scope.type = data;
      });

    $http.get('/api/types/' + $scope.typeId + '/instances')
      .success(function (data) {
        $scope.instances = InstanceService.convert(data);
      });
  });