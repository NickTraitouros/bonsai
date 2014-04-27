'use strict';

//Setting up route
angular.module('mean.trees').config(['$stateProvider',
    function($stateProvider) {

        //================================================
        // Check if the user is connected
        //================================================
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0')
                    $timeout(deferred.resolve, 0);

                // Not Authenticated
                else {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('all trees', {
                url: '/trees',
                templateUrl: 'public/trees/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create tree', {
                url: '/trees/create',
                templateUrl: 'public/trees/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit tree', {
                url: '/trees/:treeId/edit',
                templateUrl: 'public/trees/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('tree by id', {
                url: '/trees/:treeId',
                templateUrl: 'public/trees/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
