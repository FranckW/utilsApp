'use strict';
angular
    .module('utilsApp', [
        'ngRoute', 'ngAnimate', 'ui.bootstrap', 'isteven-multi-select'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/index.html',
                controller: 'ClochetteCtrl'
            }).otherwise({
                redirectTo: '/'
            });
    }).config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);