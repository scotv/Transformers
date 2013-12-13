'use strict';

var transApp = angular.module('transformersApp', ['ngResource','ngGrid','btford.socket-io'])
  .config(function ($routeProvider) {
    $routeProvider
	  .when('/', {templateUrl: 'views/deal.html', controller: 'DealCtrl'})
      .otherwise({
        redirectTo: '/'
      });
  }).config(function (socketProvider) {
    var mySocket = io.connect('http://localhost:5000');
    // do stuff with mySocket
    socketProvider.ioSocket(mySocket);
});

transApp.value('toastr',toastr);