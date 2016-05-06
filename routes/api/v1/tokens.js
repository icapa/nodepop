/**
 * Created by icapa on 4/5/16.
 */
/**
 * Created by icapa on 24/4/16.
 */

'use strict';
require('jsonwebtoken');

require('../../../local_config');

var express = require('express');
var router = express.Router();

require('mongoose');

var jwtAuth = require('../../../lib/jwtAuth');
var translator = require('../../../lib/translator');





var Token = require('mongoose').model('Token');   // Cargamos el token

router.use(jwtAuth());

router.put('/', function(req, res) {
    var platform = req.body.plataforma;
    var token = req.body.token || req.query.token ; // Para poder aprovechar el de autenticacion
    var user = req.body.usuario;
    var idioma = req.body.lan || req.query.lan  || 'es';

    console.log('Actualizando...',platform,token,user);

    // Compruebo los parametros...si no estan devuelvo error
    if (platform===undefined || user===undefined || token===undefined){
        return res.json({sucess:false, error:translator('WRONG_TOKEN_PARAMS',idioma)});
    }

    /* Para que me valida lo de ios, android, etc..creo un dummy Token y
    busco el error...
     */

    var dummyToken = new Token({user:user,platform:platform,token:token});
    var error = dummyToken.validateSync();
    if (error){

        if(error.errors.platform.properties.path === 'platform'){
            return res.json({sucess:false, error: translator('PLATFORM_NOT_VALID',idioma)});
        }
        return res.json({sucess:false, error:translator('WRONG_TOKEN_PARAMS',idioma)});
    }



    Token.findOneAndUpdate(
        { user: user},
        { $set: {token: token, platform: platform}},
        { new: true, upsert: true},
        function(err,data){
            if (err){
                console.log('Error en put');
                return res.json({sucess:false,error:translator('WRONG_TOKEN_PARAMS',idioma)});
            }
            return res.json({sucess:true,token:data});
        }
    );

});

module.exports = router;