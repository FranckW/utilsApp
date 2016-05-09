'use strict';
angular.module('utilsApp').controller('ClothesCtrl', function ($document, $scope, clothesServices) {
    $scope.clothes = {};

    function applyDataChange(data) {
        $scope.clothes = data.clothes;
    }

    $scope.loadClothes = function () {
        clothesServices.getClothes().then(
            function (data) {
                applyDataChange(data);
            });
    }
    
    $scope.removeClothes = function(id) {
        clothesServices.removeClothes(id).then(
            function (data) {
                applyDataChange(data);
            });
    }
    
    $scope.loadClothes();
});