'use strict';
angular.module('utilsApp').controller('PostItCtrl', function ($document, $scope, postItServices) {
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

    $scope.toggleCollapse = function (id) {
        var element = $document.find('#collapsePostItIcon_' + id);
        var classList = $(element).attr("class").split(' ');
        for (var i = 0; i < classList.length; i++) {
            if (classList[i] === 'glyphicon-chevron-right') {
                element.addClass('glyphicon-chevron-down');
                element.removeClass('glyphicon-chevron-right');
            }
            else {
                element.addClass('glyphicon-chevron-right');
                element.removeClass('glyphicon-chevron-down');
            }
        }
    }
    
    $scope.loadPostits();
});