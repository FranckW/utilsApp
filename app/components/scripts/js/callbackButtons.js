$(function ($http) {

    $('.addPostItBtn').click(function (event) {
        event.preventDefault();
        $http.get('http://localhost:8080/jeeServer/addEmptyPostIt').success(function (data) {
                    });
    });

});