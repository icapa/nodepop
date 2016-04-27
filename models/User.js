/**
 * Created by icapa on 27/4/16.
 */
"use strict";

var mongoose = require ('mongoose');

// User schema

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

var User =  mongoose.model('User',userSchema);
