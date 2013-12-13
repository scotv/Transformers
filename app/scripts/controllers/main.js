'use strict';

transApp.controller('MainCtrl', ['$scope', 'dealService',
    function ($scope, dealService) {
        $scope.deals = dealService.query();
        $scope.viewModel = dealService.get({id:1});
    }]
);
  
