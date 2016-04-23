/**
 * Created by icapa on 24/4/16.
 */

// Para la gestion de registro de usuarios

var express = require('express');
var router = express.Router();

/* POST users listing. */
router.post('/', function(req, res, next) {
    console.log('Registro: Creando usuario');
    console.log(req.body);
    res.send('Registro creado!!');

});

module.exports = router;
