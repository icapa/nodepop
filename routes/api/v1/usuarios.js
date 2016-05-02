/**
 * Created by icapa on 24/4/16.
 */

"use strict";
var jwt = require('jsonwebtoken');

var config = require('../../../local_config');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var translator = require('../../../lib/translator');





var User = require('mongoose').model('User');   // Cargamos el usuario



/* GET users listing. */
router.post('/authenticate', function(req, res) {
    var name = req.body.usuario;
    var password = req.body.password;
    var email = req.body.email;
    var idioma = req.body.lan || req.query.lan  || 'es';
    var passHaseado='';


    console.log('Busco nombre o usuario e idioma',email,name,idioma);


    // Podemos hacer que autorice con usuario o contraseña
    User.findOne({name: name}).exec(function(err,user){
        console.log('Esto hemos encontrado: ', user, err)
        if (err){
            return res.status(500).json({sucess: false, error: translator('WRONG_AUTH_PARAMS',idioma)});
        }
        if (!user){
            return res.status(401).json({sucess: false, error: translator('USER_NOT_FOUND',idioma)});
        }
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256');

        passHaseado = hash.update(password).digest('hex');
        if (passHaseado !== user.password){
            return res.status(401).json({sucess: false, error: translator('AUTH_FAILED',idioma)})
        }
        var token = jwt.sign({id: user._id},config.jwt.secret,{
            expiresIn: '2 days'
        });

        res.json({sucess: true, token: token});
    })
});

module.exports = router;
