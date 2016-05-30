'use strict';
angular.module('utilsApp').controller('LoginCtrl', function ($scope, $cookies, $location) {
    $scope.user = {};

    $scope.submit = function () {
        if ($scope.user.username === "Ju")
            if ($scope.user.password === "Ju") {
                var today = new Date();
                var expired = new Date(today);
                expired.setDate(today.getDate() + 30);
                $cookies.put('isLogged', true, { expires: expired });
                $location.path("/main").replace();
            }
    };

    // $scope.testLog = function () {
    //     var isLogged = $cookies.get('isLogged');
    //     if (isLogged) {
    //         //go to main page
    //         console.log("user logged");
    //         $location.path("/main").replace();
    //     }
    //     else {
    //         //go to login page
    //         console.log("user not logged");
    //         $location.path("/login").replace();
    //     }
    // };

    // $scope.testLog();
});