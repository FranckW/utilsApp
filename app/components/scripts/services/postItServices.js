'use strict';
angular.module('utilsApp').service(
    "postItServices",
    function ($http, $q) {
        return ({
            addPostIt: addPostIt,
            getPostIts: getPostIts,
            removePostIt: removePostIt,
            updatePostItTitle: updatePostItTitle,
            updatePostItContent: updatePostItContent
        });

        function addPostIt() {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/addEmptyPostIt"
            });
            return (request.then(handleSuccess, handleError));
        }

        function getPostIts() {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/postIt"
            });
            return (request.then(handleSuccess, handleError));
        }

        function removePostIt(id) {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/removePostIt",
                params: {
                    id: id
                }
            });
            return (request.then(handleSuccess, handleError));
        }
        
        function updatePostItTitle(id, title) {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/updatePostItTitle",
                params: {
                    id: id,
                    title: title
                }
            });
            return (request.then(handleSuccess, handleError));
        }
        
        function updatePostItContent(id, content) {
            var request = $http({
                method: "get",
                url: "http://localhost:8080/jeeServer/updatePostItContent",
                params: {
                    id: id,
                    content: content
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
