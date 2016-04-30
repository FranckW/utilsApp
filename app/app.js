'use strict';
angular
        .module('colorApp', [
            'ngRoute', 'ui.bootstrap'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/main', {
                        templateUrl: 'index.html',
                        controller: 'MainCtrl'
                    })
                    .otherwise({
                        redirectTo: '/main'
                    });
        });
