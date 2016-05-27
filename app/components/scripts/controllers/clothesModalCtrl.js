angular.module('utilsApp').controller('ClothesModalInstanceCtrl', function ($scope, $uibModalInstance) {
  $scope.close = function () {
    $uibModalInstance.close();
  };
});