'use strict';

angular.module('mean.eloquaapps').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('eloquaapps example page', {
            url: '/eloquaapps/example',
            templateUrl: 'eloquaapps/views/index.html'
        });
    }
]);
