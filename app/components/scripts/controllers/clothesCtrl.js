'use strict';
angular.module('utilsApp').controller('ClothesCtrl', function ($scope, clothesServices, clothesTagsServices, tagsServices, $uibModal) {
    $scope.clothes = {};
    $scope.clickedClothesId = 0;
    $scope.loading = true;

    function updateClothes(data) {
        $scope.clothes = data.clothes;
    };

    $scope.loadClothes = function () {
        $scope.loading = true;
        clothesServices.getClothes().then(
            function (data) {
                $scope.loading = false;
                updateClothes(data);
            });
    };

    $scope.loadClothes();

    $scope.removeClothes = function (id, path) {
        var result = confirm("Tu veux vraiment supprimer ça ?");
        if (result) {
            clothesServices.removeClothes(id, path).then(
                function (data) {
                    updateClothes(data);
                });
        }
    };


    //Tags part

    $scope.tags = [];

    function updateTagsSelected() {
        //check si le vetement est dans le couple vetement tag pour chaque tag, ajouter selected: true si oui, false sinon
        clothesTagsServices.getClothesTagsByClothes($scope.clickedClothesId).then(
            function (dataTags) {
                if (dataTags.clothesTag)
                    for (var j = 0; j < $scope.tags.length; j++) {
                        $scope.tags[j].selected = false;
                        for (var i = 0; i < dataTags.clothesTag.length; i++)
                            if (dataTags.clothesTag[i]['id'] === $scope.tags[j].id) {
                                $scope.tags[j].selected = true;
                                break;
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
        var alreadyCreated = false;
        for (var i = 0; i < $scope.tags.length; i++)
            if ($scope.tags[i].name === name) {
                alert("Ce tag existe déjà !")
                alreadyCreated = true;
            }
        if (!alreadyCreated)
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

    //Search part

    $scope.currentSearchTagIds = [];
    $scope.checkedTagsOutput = [];
    $scope.searchTags = [{ name: "cochez les tags" }];

    $scope.searchSelectOpen = function () {
        $scope.loadClothes();
        $scope.searchTags = $scope.tags;
    }

    $scope.searchTagClicked = function (data) {
        $scope.loading = true;
        if (data.selected === true) {
            //ajout d'un critère
            $scope.currentSearchTagIds.push(data.id);
        }
        else {
            //retrait d'un critère
            $scope.currentSearchTagIds.pop(data.id);
        }
        if ($scope.currentSearchTagIds.length > 0) {
            clothesTagsServices.getClothesTagsByTags($scope.currentSearchTagIds).then(
                function (data) {
                    $scope.loading = false;
                    updateClothes(data);
                });
        }
        else {
            $scope.loadClothes();
        }
    }
});