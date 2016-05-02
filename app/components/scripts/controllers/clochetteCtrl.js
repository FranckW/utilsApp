'use strict';
angular.module('utilsApp').controller('ClochetteCtrl', function ($scope) {
    $scope.choices = [{ id: "1", value: "" }];


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
    };

});