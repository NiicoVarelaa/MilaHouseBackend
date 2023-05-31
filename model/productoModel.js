const  {Schema, model} = require("mongoose");

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },

    precio: {
        type: String,
        required: true,
    },

    imagen: {
        type: String,
        required: true,
    }


});

module.exports = model("Producto", ProductoSchema);