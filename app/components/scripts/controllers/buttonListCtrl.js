'use strict';
angular.module('colorApp').controller('ButtonListCtrl', ["$scope", "$rootScope", "$http", function ($scope, $rootScope, $http) {
        $scope.loadColors = function () {
            $http.get('http://localhost:8080/infos').success(function (data) {
                $scope.colorsData = data.colors;
            });
        };

        $rootScope.$on('dropEvent', function (evt, dragged, dropped) {
            var temp = $scope.colorsData[dragged];
            $scope.colorsData[dragged] = $scope.colorsData[dropped];
            $scope.colorsData[dropped] = temp;
            $scope.$apply();
        });

        $scope.loadColors();
    }]);


