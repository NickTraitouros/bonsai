'use strict';

//trees service used for trees REST endpoint
angular.module('mean.trees').factory('Trees', ['$resource', function($resource) {
    return $resource('trees/:treeId', {
        treeId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);