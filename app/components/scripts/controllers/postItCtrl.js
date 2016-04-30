'use strict';
angular.module('utilsApp').controller('PostItCtrl', ["$scope", "$rootScope", "$http", function ($scope, $rootScope, $http) {
        $scope.loadPostits = function () {
            $http.get('http://localhost:8080/jeeServer/postIt').success(function (data) {
                $scope.postits = data.postits;
            });
        };

        $scope.loadPostits();
    }]);


