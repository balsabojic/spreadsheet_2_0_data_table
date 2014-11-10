angular.module('Spreadsheet.sidebar', [
  'ui.router'
])
  .controller('SidebarCtrl', function ($scope, $http) {
    $http.get('/api/types')
      .success(function (data) {
        $scope.types = data;
      });
  });