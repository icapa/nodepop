/**
 * Created by icapa on 27/4/16.
 */
'use strict';

var mongoose = require ('mongoose');

// User schema

var tokenSchema = mongoose.Schema({
    platform: {type: String, enum: ['ios','android']},
    token: String,
    user: String
});

mongoose.model('Token',tokenSchema);


