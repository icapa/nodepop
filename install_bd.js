/**
 * Created by icapa on 24/4/16.
 */
"use strict";

var mongoose = require('mongoose');

require('./lib/connectMongoose');

require('./models/User');
require('./models/Ad');
require('./models/Token');



var User = require('mongoose').model('User');
var Ad = require('mongoose').model('Ad');
var Token = require('mongoose').model('Token');


// Script para cargar la base de datos

console.log("-- Initializing bbdd ---");

console.log(" Deleting all the collections....");

User.remove({},function(err){
   if (err){
       console.log('\t Error deleting users!')
       return;
   }
    console.log('\t Users deleted OK!!');
    Ad.remove({},function(err){
        if (err){
            console.log('\t Error deleting ads!')
            return;
        }
        console.log('\t Ads deleted OK!!');

        Token.remove({},function(err){
            if (err){
                console.log('\t Error deleting Tokens!')
                return;
            }
            console.log('\t Tokens deleted OK!!');
            rellenaBBDD(function(err){
                console.log('Closing database...');
                mongoose.connection.close();
            })
        });
    });
});

function rellenaBBDD(cb){
    var user = new User({name: 'admin', email:'admin@nodepop.es',password: '12345'});
    console.log('Filling bbdd with data...');
    user.save(function(err,reg){
        if (err){
            console.log('Error !!! ',err);
            cb(err);
            return;
        }
        console.log('User -> '+reg.name+ ' email->'+reg.email);
        cb(null);
        return;
    });
}






