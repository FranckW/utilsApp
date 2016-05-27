'use strict';
angular.module('utilsApp').controller('SearchTagCtrl', function ($scope) {
    $scope.searchTags = [{ id: "1", value: "" }, { id: "2", value: "" }];

    $scope.addChoice = function () {
        var index = $scope.searchTags.length + 1;
        var dataObj = { id: index, value: '' };
        $scope.searchTags.push(dataObj);
    };

    $scope.removeTagInput = function (tagInput) {
        $scope.searchTags.pop(tagInput);
    };

    $scope.pick = function () {
        var randomIndex = 1 + Math.floor(Math.random() * $scope.choices.length);
        $scope.result = $scope.choices[randomIndex - 1].value;
        if (!$scope.result) {
            $scope.result = "Entre des choix !";
        }
        $scope.open();
    };

    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: 'ClochetteModalInstanceCtrl',
            resolve: {
                items: function () {
                    return true;
                }
            },
            scope: $scope
        });

        modalInstance.result.then();
    };

});