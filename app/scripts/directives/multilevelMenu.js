'use strict';

transApp.directive('multilevelMenu', function () {
    return {
        restrict: 'E', //A --attribute, //C --class //E-- Element //M -- Comment
        replace: true,
        scope:{},
        templateUrl: 'templates/directives/multiMenu.html'
    }
});