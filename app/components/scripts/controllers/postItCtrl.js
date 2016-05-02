'use strict';
angular.module('utilsApp').controller('PostItCtrl', function ($scope, postItServices) {
    function applyRemoteData(data) {
        $scope.postits = data.postits;
    }

    $scope.loadPostits = function () {
        postItServices.getPostIts().then(
            function (data) {
                applyRemoteData(data);
            });
    };

    $scope.addPostIt = function () {
        postItServices.addPostIt().then(
            function (data) {
                applyRemoteData(data);
            });
    };

    $scope.removePostIt = function (id) {
        postItServices.removePostIt(id).then(
            function (data) {
                applyRemoteData(data);
            });
    };

    $scope.loadPostits();
}); 