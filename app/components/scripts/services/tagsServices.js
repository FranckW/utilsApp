'use strict';
angular.module('utilsApp').service(
    "tagsServices",
    function ($http, $q) {
        return ({
            addTag: addTag,
            getTags: getTags,
            removeTag: removeTag
        });

        function addTag(name) {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/addTag",
                params: {
                    name: name
                }
            });
            return (request.then(handleSuccess, handleError));
        }

        function getTags() {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/tags"
            });
            return (request.then(handleSuccess, handleError));
        }

        function removeTag(id) {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/removeTag",
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
