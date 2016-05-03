/**
 * Created by icapa on 27/4/16.
 */
"use strict";

var mongoose = require ('mongoose');

// Add schema

var adSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,  // True si es una venta, False si es búsqueda
    precio: Number,
    foto: String,
    tags: [String]
});

adSchema.statics.list = function(filter,start,limit,sort,cb){
    var query = Ad.find(filter);
    console.log('La query es:',filter);
    query.skip(start);
    query.limit(limit);
    query.sort(sort);
    return query.exec(cb);
}

/* Funcion que convierte criterio de busqueda de precio a formato de mongo */
adSchema.statics.precioAFiltro = function(precio){
    var elFiltro={};
    var items = precio.split('-');

    if (items.length===1) {
        return precio;
    }
    if (items.length===2){  // El array es de dos, hay tres posibilidades
        console.log('Hay dos precios: ', items[0], items[1]);
        console.log('Los tipos son: ', typeof parseInt(items[0]), typeof parseInt(items[1]));
        if (items[0]!== '' && items[1]!==''){   // Busqueda completa, dos limites
            elFiltro={'$gte': parseInt(items[0]), '$lte': parseInt(items[1])};
        }
        else {  // Solo hay un límite
            if (items[0]!==''){ // limite inferior
                elFiltro={'$gte': parseInt(items[0])};
            }
            if (items[1]!==''){ // limite superior
                elFiltro={'$lte': parseInt(items[1])};
            }
        }
    }
    
    return elFiltro;

};

var Ad = mongoose.model('Ad',adSchema);
