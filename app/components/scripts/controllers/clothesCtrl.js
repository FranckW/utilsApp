'use strict';
angular.module('utilsApp').controller('ClothesCtrl', function ($scope, clothesServices, clothesTagsServices, tagsServices, $uibModal) {
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

    $scope.loadClothes();

    $scope.removeClothes = function (id, path) {
        clothesServices.removeClothes(id, path).then(
            function (data) {
                updateClothes(data);
            });
    };

    $scope.tags = []; /*[
    { id: 1, name: "Pull", selected: true  },
    { id: 2, name: "Echarpe", selected: false },
    { id: 3, name: "T-shirt", selected: true  },
    { id: 4, name: "Jupe", selected: false },
    { id: 5, name: "Pantalon", selected: true  }
]; */

    function updateTagsSelected() {
        //check si le vetement est dans le couple vetement tag pour chaque tag, ajouter selected: true si oui, false sinon
        clothesTagsServices.getClothesTagsByClothes($scope.clickedClothesId).then(
            function (dataTags) {
                if (dataTags.clothesTag) {
                    for (var j = 0; j < $scope.tags.length; j++) {
                        $scope.tags[j].selected = false;
                        for (var i = 0; i < dataTags.clothesTag.length; i++) {
                            if (dataTags.clothesTag[i]['id'] === $scope.tags[j].id) {
                                $scope.tags[j].selected = true;
                                break;
                            }
                        }
                    }
                }
            });
    };

    $scope.clickClothesImg = function (item) {
        $scope.clickedClothesId = item.id;
        updateTagsSelected();
        $scope.open();
    }

    $scope.loadTags = function () {
        tagsServices.getTags().then(
            function (data) {
                $scope.tags = [];
                for (var i = 0; i < data.tags.length; i++) {
                    var dataJson = data.tags[i];
                    dataJson.selected = false;
                    $scope.tags.push(dataJson);
                }
                $scope.tags.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
            });
    };

    $scope.createTag = function (name) {
        if (name) {
            tagsServices.addTag(name).then(
                function (data) {
                    $scope.loadTags();
                    updateTagsSelected();
                });
        }
    };

    $scope.tagClicked = function (data) {
        if (data.selected) {
            clothesTagsServices.addClothesTag($scope.clickedClothesId, data.id).then(
                function (responsedata) {
                });
        } else {
            clothesTagsServices.removeClothesTag($scope.clickedClothesId, data.id).then(
                function (responsedata) {
                });
        }
    };

    $scope.loadTags();

    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myClothesModalContent.html',
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