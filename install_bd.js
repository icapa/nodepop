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
                rellenaAnuncios(function(err){
                    if (!err){
                        console.log('-- BBDD structure created OK !!!!---');
                    }
                    else
                    {
                        console.log('There was an error completing BBDD structure !!');
                    }
                    console.log('Closing database...');
                    mongoose.connection.close();
                });

            });
        });
    });
});

function rellenaBBDD(cb){
    var user = new User({name: 'admin', email:'admin@nodepop.es',password: '12345'});
    var token = new Token({platform:'ios', user:'admin', token:'fake_token'});
    console.log('Filling bbdd with data...');
    user.save(function(err,reg){
        if (err){
            console.log('Error !!! ',err);
            cb(err);
            return;
        }
        console.log('User -> '+reg.name+ ' email->'+reg.email);
        token.save(function(err,reg){
            if (err){
                console.log('Error inserting token!');
                cb(err);
                return;
            }
            console.log('Token:');
            console.log('\tUser: '+reg.user+', '+reg.platform+', '+reg.token);
            cb(null);
            return;
        })

    });
}

function rellenaAnuncios(cb){
    try {
        var anunciosFs = require('fs').readFileSync('anuncios.json', 'utf-8');
        var anunciosJson= JSON.parse(anunciosFs);
        console.log('Inserting: '+ anunciosJson.anuncios.length+ ' ads');
        mongoose.connection.collection('ads').insert(anunciosJson.anuncios);
        cb(null);
    }catch(err){
        console.log('-- Error reading ad file...'+ err);
        cb(err);
    }
}




