/**
 * Created by icapa on 24/4/16.
 */
"use strict";

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('Peticion lista anuncios');
    var inventoJson =
    {
        "anuncios" : [
            {
            "nombre": "moto",
            "vende": "si",
            "precio": "3000",
            "foto": "moto.png",
            "tag": "motor"
            },
            {
            "nombre": "moto2",
            "vende": "no",
            "precio": "5000",
            "foto": "moto2.png",
            "tag": "motor"
            }
        ]
    };
    res.json(inventoJson);
});

module.exports = router;
