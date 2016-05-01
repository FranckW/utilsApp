'use strict';
angular.module('utilsApp').controller('PostItCtrl', ["$scope", "$rootScope", "$http", function ($scope, $rootScope, $http) {
        $scope.loadPostits = function () {
            $http.get('http://localhost:8080/jeeServer/postIt').success(function (data) {
                $scope.postits = data.postits;
            });
        };

        $scope.loadPostits();
    }])
  .directive('contenteditable', function($timeout) {
    return {
      restrict: "A",
      priority: 1000,
      scope:{ngModel:"="},
      link: function(scope, element) {
        element.html(scope.ngModel);
        element.on('blur', function() {
          scope.ngModel = element.text();
          alert(element.text());
          scope.$apply();
          return element;
        });
      }
    };
  });


