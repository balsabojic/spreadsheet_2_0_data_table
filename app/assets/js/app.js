angular.module('Spreadsheet', [
  'Spreadsheet.type',
  'ui.router'
])
  .config(function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: function ($state) {
          $state.go('types');
        }
      });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .run(function run() {
  })
  .filter('unsafe', function ($sce) {
    return $sce.trustAsHtml;
  });