'use strict';

angular.module('mean.eloquaapps').controller('EloquaappsController', ['$scope', 'Global', 'Eloquaapps',
    function($scope, Global, Eloquaapps) {
        $scope.global = Global;
        $scope.package = {
            name: 'eloquaapps'
        };
    }
]);
