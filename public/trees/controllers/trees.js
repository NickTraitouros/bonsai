'use strict';

angular.module('mean.trees').controller('TreesController', ['$scope', '$filter', '$stateParams', '$location', 'Global', 'Trees', function ($scope, $filter, $stateParams, $location, Global, Trees) {
    $scope.global = Global;

    $scope.create = function() {
        var tree = new Trees({
            species: this.species,
            birthday: this.birthday,
            age: this.age,
            description: this.description
        });
        tree.$save(function(response) {
            $location.path('trees/' + response._id);
        });

        this.species = '';
        this.birthday = new Date;
        this.age = 0;
        this.description = '';
    };

    $scope.remove = function(tree) {
        if (tree) {
            tree.$remove();

            for (var i in $scope.trees) {
                if ($scope.trees[i] === tree) {
                    $scope.trees.splice(i, 1);
                }
            }
        }
        else {
            $scope.tree.$remove();
            $location.path('trees');
        }
    };

    $scope.update = function() {
        var tree = $scope.tree;
        if (!tree.updated) {
            tree.updated = [];
        }
        tree.updated.push(new Date().getTime());
        tree.$update(function() {
            $location.path('trees/' + tree._id);
        });
    };

    $scope.find = function() {
        Trees.query(function(trees) {
            $scope.trees = trees;
        });
    };

    $scope.findOne = function() {
        Trees.get({
            treeId: $stateParams.treeId
        }, function(tree) {
            $scope.tree = tree;
            $scope.tree.birthday = $filter("date")($scope.tree.birthday, 'yyyy-MM-dd');
        });
    };
}]);