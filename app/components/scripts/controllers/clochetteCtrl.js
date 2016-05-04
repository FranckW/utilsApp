'use strict';
angular.module('utilsApp').controller('ClochetteCtrl', function ($scope, $uibModal) {
    $scope.choices = [{ id: "1", value: "" }, { id: "2", value: "" }, { id: "3", value: "" }];
    $scope.result = "Entre des choix !";

    $scope.addChoice = function () {
        var index = $scope.choices.length + 1;
        var dataObj = { id: index, value: '' };
        $scope.choices.push(dataObj);
    };

    $scope.removeChoice = function (choice) {
        $scope.choices.pop(choice);
    };

    $scope.pick = function () {
        var randomIndex = 1 + Math.floor(Math.random() * $scope.choices.length);
        $scope.result = $scope.choices[randomIndex - 1].value;
        if (!$scope.result) {
            $scope.result = "Entre des choix !";
        }
        $scope.open();
    };

    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: 'ClochetteModalInstanceCtrl',
            size: size,
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