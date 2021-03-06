'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Tree = mongoose.model('Tree'),
    _ = require('lodash');


/**
 * Find tree by id
 */
exports.tree = function(req, res, next, id) {
    Tree.load(id, function(err, tree) {
        if (err) return next(err);
        if (!tree) return next(new Error('Failed to load tree ' + id));
        req.tree = tree;
        next();
    });
};

/**
 * Create an tree
 */
exports.create = function(req, res) {
    var tree = new Tree(req.body);
    tree.user = req.user;

    tree.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                tree: tree
            });
        } else {
            res.jsonp(tree);
        }
    });
};

/**
 * Update an tree
 */
exports.update = function(req, res) {
    var tree = req.tree;

    tree = _.extend(tree, req.body);

    tree.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                tree: tree
            });
        } else {
            res.jsonp(tree);
        }
    });
};

/**
 * Delete an tree
 */
exports.destroy = function(req, res) {
    var tree = req.tree;

    tree.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                tree: tree
            });
        } else {
            res.jsonp(tree);
        }
    });
};

/**
 * Show an tree
 */
exports.show = function(req, res) {
    res.jsonp(req.tree);
};

/**
 * List of Trees
 */
exports.all = function(req, res) {
    Tree.find().sort('-created').populate('user', 'name username').exec(function(err, trees) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(trees);
        }
    });
};
