'use strict';
angular
    .module('utilsApp', [
        'ngRoute', 'ngCookies', 'ngAnimate', 'ui.bootstrap', 'isteven-multi-select'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: '/index.html',
                controller: 'ClochetteCtrl'
            }).when('/login', {
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl'
            }).otherwise({
                redirectTo: '/main'
            });
    }).config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);