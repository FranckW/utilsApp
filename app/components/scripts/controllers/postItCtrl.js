'use strict';
angular.module('utilsApp').controller('PostItCtrl', ["$scope", "$rootScope", "$http", function ($scope, $rootScope, $http) {
    $scope.loadPostits = function () {
        $http.get('http://localhost:8080/jeeServer/postIt').success(function (data) {
            $scope.postits = data.postits;
        });
    };

    $scope.loadPostits();
}]).directive('contenteditable', function ($http) {
    return {
        restrict: "A",
        scope: { ngModel: "=" },
        link: function (scope, element, attr) {
            if (attr.id === "titleedit") {
                element.html(scope.ngModel.title);
            }
            else if (attr.id === "contentedit") {
                element.html(scope.ngModel.content);
            }
            element.on('blur', function () {
                var editedText = element.html();
                var replacement = editedText.trim()
                    .replace(/<br(\s*)\/*>/ig, '\n')
                    .replace(/<[p|div]\s/ig, '\n$0')
                    .replace(/(<([^>]+)>)/ig, "");

                if (attr.id === "titleedit") {
                    $http.get('http://localhost:8080/jeeServer/updatePostItTitle?id=' + scope.ngModel.id + '&title=' + editedText).success(function (data) {
                    });
                }
                else if (attr.id === "contentedit") {
                    $http.get('http://localhost:8080/jeeServer/updatePostItContent?id=' + scope.ngModel.id + '&content=' + editedText).success(function (data) {
                    });
                }
                scope.$apply();
                return element;
            });
        }
    };
}).directive('addPostit', function($http) { 
    return {
        restrict: "A"
    }
});