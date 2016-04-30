'use strict';
angular
        .module('utilsApp', [
            'ngRoute', 'ui.bootstrap'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/main', {
                        templateUrl: 'index.html',
                        controller: 'PostItCtrl'
                    })
                    .otherwise({
                        redirectTo: '/main'
                    });
        });
