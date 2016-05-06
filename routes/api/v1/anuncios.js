/**
 * Created by icapa on 24/4/16.
 */
"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var translator = require ('../../../lib/translator');
var jwtAuth = require('../../../lib/jwtAuth');


var Ad = mongoose.model('Ad');

//-- Requerimos autentificacion para todo

router.use(jwtAuth());

/* GET users listing. */
router.get('/', function(req, res, next) {
    var tag = req.query.tag;
    var venta = req.query.venta;
    var nombre = req.query.nombre;
    var precio = req.query.precio;
    var incluirTotal = req.query.incluirTotal || false;

    var idioma = req.query.lan || 'es'; // Si hay idioma se coge, si no por defecto
    //---
    var limit = parseInt(req.query.limit) || 0;
    var start = parseInt(req.query.start) || null;
    var sort = req.query.sort || null;
    
    //console.log(tag,venta,nombre,precio,limit,start,sort);
    var criteria = {};
    
    if (typeof nombre != "undefined"){
        criteria.nombre = new RegExp('^' + nombre, 'i');
        //console.log('Criterio de nombre ->',criteria.name);
    }
    if (typeof tag != "undefined"){
        criteria.tags = Ad.tagsAFiltro(tag);
    }
    if (typeof venta != "undefined"){
        criteria.venta=venta;
    }
    if (typeof precio != "undefined"){
        criteria.precio = Ad.precioAFiltro(precio);
    }
    if (typeof venta !== "undefined"){
        if (venta==='true'){
            criteria.venta=true;
        }
        else{
            criteria.venta=false;
        }
    }

    //console.log('Criteria ->',criteria);

    Ad.list(criteria,start,limit,sort,function(err,rows) {
        if (err) {
            return res.json({sucess: false, error: translator('WRONG_QUERY',idioma)});
        }
        console.log('Se quiere incluir total', incluirTotal);
        if (incluirTotal==='true'){
            return res.json({sucess: true, total:rows.length, rows:rows});
        }
        return res.json({sucess: true, rows: rows});

    });
});



module.exports = router;
