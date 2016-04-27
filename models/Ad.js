/**
 * Created by icapa on 27/4/16.
 */
"use strict";

var mongoose = require ('mongoose');

// Add schema

var adSchema = mongoose.Schema({
    name: String,
    sale: Boolean,  // True si es una venta, False si es búsqueda
    price: Number,
    photo: String,
    tags: [String]
});

var Ad = mongoose.model('Ad',adSchema);
