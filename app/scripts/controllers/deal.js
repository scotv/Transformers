'use strict';

transApp.controller('DealCtrl', ['$scope', 'dealService','socket','toastr', function ($scope, Deal,socket,toastr) {

    socket.on('created', function (data) {
        $scope.deals = Deal.query();
        if($scope.model && (data.dealNumber ===  $scope.model.dealNumber)){
            toastr.success('the deal you are editing has bee changed by others'+data.dealNumber);
            $scope.model = Deal.get({id:data.dealNumber});
        }else{
            toastr.success('new deal has been created, dealNumber:'+data.dealNumber);
        }

    });

    $scope.deals = Deal.query();
    $scope.title = "Foreign Exchange";
    $scope.model = Deal.new();
    $scope.save = function (model) {
        var deal = new Deal(model);
        deal.$save();
        $scope.deals.push(deal);
        socket.emit('deal-created',model);
    };
    $scope.edit = function (dealNumber) {
        console.log(dealNumber);
        $scope.model = Deal.get({id:dealNumber});
    };
    $scope.gridOptions = { data: 'deals' };
}]);
