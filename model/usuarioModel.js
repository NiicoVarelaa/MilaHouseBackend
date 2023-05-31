const  {Schema, model} = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },

    apellido: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    rol: {
        type: String,
        default: "usuario",
    },

    estado: {
        type: String,
        default: "activo",
    }
});

module.exports = model("Usuario", UsuarioSchema);