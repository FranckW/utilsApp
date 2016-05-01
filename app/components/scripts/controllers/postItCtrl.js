'use strict';
angular.module('utilsApp').controller('PostItCtrl', ["$scope", "$rootScope", "$http", function ($scope, $rootScope, $http) {
    $scope.loadPostits = function () {
        $http.get('http://localhost:8080/jeeServer/postIt').success(function (data) {
            $scope.postits = data.postits;
        });
    };

    $scope.loadPostits();
}]).directive('contenteditable', function ($timeout, $http) {
    return {
        restrict: "A",
        scope: { ngModel: "="},
        link: function (scope, element, attr) {
            if (attr.id === "titleedit") {
                   element.html(scope.ngModel.title);
                }
                else if (attr.id === "contentedit") {
                   element.html(scope.ngModel.content);
                }
            element.on('blur', function () {
                if (attr.id === "titleedit") {
                    $http.get('http://localhost:8080/jeeServer/updatePostItTitle?id='+ scope.ngModel.id + '&title=' + element.text()).success(function (data) {
                      });
                   // alert("Titre : "  + element.text() +". Mon id est " + scope.ngModel.id);
                }
                else if (attr.id === "contentedit") {
                    $http.get('http://localhost:8080/jeeServer/updatePostItContent?id='+ scope.ngModel.id + '&content=' + element.text()).success(function (data) {
                      });
                   // alert("Content : " + scope.ngModel.content +". Mon id est " + scope.ngModel.id);
                }
                scope.$apply();
                return element;
            });
        }
    };
});