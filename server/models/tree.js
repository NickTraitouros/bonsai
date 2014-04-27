'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Tree Schema
 */
var TreeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    species: {
        type: String,
        default: '',
        trim: true
    },
    age: {
        type: Number,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
TreeSchema.path('species').validate(function(species) {
    return species.length;
}, 'Species cannot be blank');

/**
 * Statics
 */
TreeSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Tree', TreeSchema);
