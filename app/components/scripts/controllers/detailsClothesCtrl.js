'use strict';
angular.module('utilsApp').controller('DetailsClothesCtrl', function ($scope, clothesTagsServices, tagsServices) {
    $scope.tags = []; /*[
    { id: 1, name: "Pull", selected: true  },
    { id: 2, name: "Echarpe", selected: false },
    { id: 3, name: "T-shirt", selected: true  },
    { id: 4, name: "Jupe", selected: false },
    { id: 5, name: "Pantalon", selected: true  }
]; */
    
    function updateTagsSelected() {
        //check si le vetement est dans le couple vetement tag pour chaque tag, ajouter selected: true si oui, false sinon
        clothesTagsServices.getClothesTagsByClothes($rootScope.clickedClothesId).then(
            function (dataTags) {
                for(var j=0; j < $scope.tags.length; j++) {
                   for (var i=0 ; i < dataTags.clothesTag.length ; i++) {
                        if (dataTags.clothesTag[i]['tag_id'] === $scope.tags[j].id) {
                             $scope.tags[j].selected = true;
                             //tmpjson = { id: $scope.tags[j].id, name: $scope.tags[j].name, selected: true };  
                        }
                        else {
                             $scope.tags[j].selected = false;
                        }
                    }
                }
           }); 
    };
    
    $scope.loadTags = function() {
        tagsServices.getTags().then(
            function (data) {
              $scope.tags = [];
              for(var i=0; i < data.tags.length; i++) {
                var dataJson = data.tags[i];
                dataJson.selected = false;
                $scope.tags.push(dataJson);
              }
              updateTagsSelected();
            });
    };
    
    $scope.createTag = function(name) {
        //chercher dans la liste, ne pas ajouter si déjà présent
         tagsServices.addTag(name).then(
             function (data) {
               $scope.tags.push(data.tags[data.tags.length - 1]);
             });
    };
    
    $scope.tagClicked = function(data) {
        if(data.selected) {
        clothesTagsServices.addClothesTag($rootScope.clickedClothesId, data.id).then(
            function (responsedata) {
              console.log("add");
            });
        } else {
            clothesTagsServices.removeClothesTag($rootScope.clickedClothesId, data.id).then(
            function (responsedata) {
              console.log("remove");
            });
        }
    };
    
    $scope.loadTags();
    
    $scope.newTag = " ";
    
    $scope.submit = function(){
        if ($scope.newTag) {
            console.log(this.newTag);
          //$scope.createTag(this.newTag);
        }
    }
    
});