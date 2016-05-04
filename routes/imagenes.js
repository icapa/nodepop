/**
 * Created by icapa on 4/5/16.
 */
/**
 * Created by icapa on 24/4/16.
 */
"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var translator = require ('../lib/translator');
var jwtAuth = require('../lib/jwtAuth');




//-- Requerimos autentificacion para todo

//router.use(jwtAuth());

router.get('/:imagen',function(req,res){
    console.log('la imagen '+req.params.imagen);
    var idioma = req.query.lan || "es";
    res.download('./public/images/'+req.params.imagen,req.params.imagen,function(err){
        if (err){
            return res.json({sucess:false,error:translator('IMAGE_NOT_FOUND',idioma)});
        }
    })

});

module.exports = router;