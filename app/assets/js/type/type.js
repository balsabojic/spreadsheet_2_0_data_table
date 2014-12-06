angular.module('Spreadsheet.type', [
  'Spreadsheet.jsx',
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
  .controller('TypeCtrl', function ($scope, $http, $state) {
    $scope.currentType = null;
    $http.get('/api/types')
      .success(function (data) {
        $scope.types = data;
      });

    $scope.changeType = function () {
      $state.go('types.detail', {id: $scope.currentType});
    };
  })
  .controller('TypeDetailCtrl', function ($scope, $http, $stateParams, InstanceService) {
    $scope.$parent.currentType = $stateParams.id;
    $scope.data = {id: $stateParams.id};
  });