angular.module('Spreadsheet', [
  'Spreadsheet.type',
  'Spreadsheet.sidebar',
  'ui.router'
])
  .config(function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/'
      });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .run(function run() {
  });