/**
 * Created by icapa on 27/4/16.
 */
"use strict";


var async = require('async');

var mongoose = require ('mongoose');

// User schema

var userSchema = mongoose.Schema({
    name: {type: String, required: true, index:true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});


userSchema.statics.buscaUsuarioEmail = function(usuario,email,callback){
    async.parallel({
        userFind: function(cb){
            User.findOne({name: usuario},function(err,user){
                if (err){
                    return cb(err,null);
                }
                if (user){
                    return cb(null,true);;
                }
                return cb(null,false);
            });
        },
        emailFind: function(cb){
            User.findOne({email: email},function(err,user){
                if (err){
                    return cb(err,null);
                }
                if (user){
                    console.log('Encontrado email ->', user.email);
                    return cb(null,true);
                }
                console.log('No encontramos emaul');
                return cb(null,false);
            });
        }
        },function(err,result){
            console.log('Acaba async usuario,email',result.userFind,result.emailFind);
            callback(err,[result.userFind,result.emailFind]);
        }
    );
}



    



var User =  mongoose.model('User',userSchema);
