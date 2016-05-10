'use strict';
angular.module('utilsApp').controller('ClothesCtrl', function ($scope, clothesServices, clothesTagsServices, tagsServices) {
    $scope.clothes = {};

    function updateClothes(data) {
        $scope.clothes = data.clothes;
    }

    $scope.loadClothes = function () {
        clothesServices.getClothes().then(
            function (data) {
              updateClothes(data);
            });
    }
    
    $scope.removeClothes = function(id, path) {
        clothesServices.removeClothes(id, path).then(
            function (data) {
              updateClothes(data);
            });
    }
    
    $scope.loadClothes();
    
    //Clothes tags couples
    
    $scope.clothesTag = []; /*[
    { id: 1, name: "Opera", selected: true  },
    { id: 2, name: "Internet Explorer", selected: false },
    { id: 3, name: "Firefox", selected: true  },
    { id: 4, name: "Safari", selected: false },
    { id: 5, name: "Chrome", selected: true  }
]; */

    $scope.clothes_id = 0;
    $scope.tags = {};
    
    function updateTags(data) {
        //check si le vetement est dans le couple vetement tag pour chaque tag, ajouter selected: true si oui, false sinon
        clothesTagsServices.getClothesTagsByClothes($scope.clothes_id).then(
            function (dataTags) {
                var isSelected = false;
               for (var i=0 ; i < data.clothesTag.length ; i++)
{
    if (dataTags.clothesTag[i]['tag_id'] === data.clothesTag.id) {
        var tmpjson = { id: data.clothesTag.id, name: data.clothesTag.name, selected: true };  
    }
    else {
        var tmpjson = { id: data.clothesTag.id, name: data.clothesTag.name, selected: false }; 
    }
}
              
              
              
            });
        for (var i=0 ; i < data.clothesTag.length ; i++)
{
    if (data.clothesTag[i]['name'] == data.clothesTag.length) {
        isSelected = true;
    }
}
        var tmpjson = { id: data.clothesTag.id, name: data.clothesTag.name, selected: isSelected };  
        $scope.clothesTag.push(tmpjson);
    }
    
    function updateTagsList(data) {
        $scope.tags = data.tags;
    }
    
    $scope.loadTagsFor = function(clothes_id) {
        clothesTagsServices.getClothesTagsByClothes(clothes_id).then(
            function (data) {
              updateTags(data);
            });
    }
    
    $scope.loadTags = function() {
        tagsServices.getTags().then(
            function (data) {
              updateTagsList(data);
            });
    }
    
    angular.forEach( $scope.outputDropdown, function( value, key ) {    
    alert("value : " + value +" key : " + key);   
});
    
    
    $scope.createTag = function(name) {
        tagsServices.addTag("Pull");
    }
    
    
    
    $scope.removeClothesTag = function(clothes_id, tag_id) {
        clothesTagsServices.removeClothesTag(clothes_id, tag_id).then(
            function (data) {
              updateTags(data);
            });
    }
    
    $scope.addClothesTag = function(clothes_id, tag_id) {
        clothesTagsServices.addClothesTag(clothes_id, tag_id).then(
            function (data) {
              updateTags(data);
            });
    }
    
    $scope.loadTags();
    
});