'use strict';
angular.module('utilsApp').controller('NavBarCtrl', function ($scope, $cookies) {
    $scope.logout = function () {
        $cookies.remove('isLogged');
        $location.path("/login").replace();
    }
});