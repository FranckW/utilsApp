'use strict';
angular.module('utilsApp').service(
    "clothesTagsServices",
    function ($http, $q) {
        return ({
            addClothesTag: addClothesTag,
            getClothesTagsByTags: getClothesTagsByTags,
            getClothesTagsByClothes: getClothesTagsByClothes,
            removeClothesTag: removeClothesTag
        });

        function addClothesTag(clothes_id, tag_id) {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/addClothesTag",
                params: {
                    clothes_id: clothes_id,
                    tag_id: tag_id
                }
            });
            return (request.then(handleSuccess, handleError));
        }

        function getClothesTagsByTags(tags) {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/searchByTags",
                params: {
                    tagId: tags
                }
            });
            return (request.then(handleSuccess, handleError));
        }

        function getClothesTagsByClothes(clothes_id) {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/searchByClothes",
                params: {
                    clothes_id: clothes_id
                }
            });
            return (request.then(handleSuccess, handleError));
        }

        function removeClothesTag(clothes_id, tag_id) {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/removeClothesTag",
                params: {
                    clothes_id: clothes_id,
                    tag_id: tag_id
                }
            });
            return (request.then(handleSuccess, handleError));
        }

        function handleError(response) {
            if (
                !angular.isObject(response.data) ||
                !response.data.message
            ) {
                return ($q.reject("An unknown error occurred."));
            } return ($q.reject(response.data.message));
        }

        function handleSuccess(response) {
            return (response.data);
        }
    }
);
