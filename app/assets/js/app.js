angular.module('Spreadsheet', [
  'Spreadsheet.type',
  'ui.router'
])
  .config(function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: function($location) {
          $location.path('/types');
        }
      });
    $urlRouterProvider.otherwise('/types');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .run(function run() {
  });