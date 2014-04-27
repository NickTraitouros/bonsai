'use strict';

// Articles routes use trees controller
var trees = require('../controllers/trees');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.tree.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/trees', trees.all);
    app.post('/trees', authorization.requiresLogin, trees.create);
    app.get('/trees/:treeId', trees.show);
    app.put('/trees/:treeId', authorization.requiresLogin, hasAuthorization, trees.update);
    app.del('/trees/:treeId', authorization.requiresLogin, hasAuthorization, trees.destroy);

    // Finish with setting up the treeId param
    app.param('treeId', trees.tree);

};