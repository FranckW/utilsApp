angular.module('utilsApp').controller('ClochetteModalInstanceCtrl', function ($scope, $uibModalInstance) {
  $scope.close = function () {
    $uibModalInstance.close();
  };
});