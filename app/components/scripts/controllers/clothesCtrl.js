'use strict';
angular.module('utilsApp').controller('ClothesCtrl', function ($scope, clothesServices) {
    $scope.clothes = {};
    $scope.clickedClothesId = 0;

    function updateClothes(data) {
        $scope.clothes = data.clothes;
    };

    $scope.loadClothes = function () {
        clothesServices.getClothes().then(
            function (data) {
              updateClothes(data);
            });
    };
    
    $scope.removeClothes = function(id, path) {
        clothesServices.removeClothes(id, path).then(
            function (data) {
              updateClothes(data);
            });
    };
    
    $scope.clickClothesImg = function(item) {
        $scope.clickedClothesId = item.id;
    }
    
    $scope.loadClothes();
});