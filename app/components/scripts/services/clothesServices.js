'use strict';
angular.module('utilsApp').service(
    "clothesServices",
    function ($http, $q) {
        return ({
            addClothes: addClothes,
            getClothes: getClothes,
            removeClothes: removeClothes
        });

        function addClothes(path) {
            var request = $http({
                method: "post",
                url: "http://localhost:8080/jeeServer/addClothes",
                params: {
                    path: path
                },
                headers: {'Content-Type': 'multipart/form-data'}
            });
            return (request.then(handleSuccess, handleError));
        }

        function getClothes() {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/clothes"
            });
            return (request.then(handleSuccess, handleError));
        }

        function removeClothes(id) {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/removeClothes",
                params: {
                    id: id
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
