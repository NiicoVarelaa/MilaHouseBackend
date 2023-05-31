const express = require("express");
const { check } = require("express-validator");
const { crearProducto, cargarProductos, cargarUsuarios, eliminarProducto, editarProducto, suspenderUsuario, activarUsuario } = require("../controllers/admin");
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require("../middlewares/validarJwt");
const routerAdmin = express.Router();

routerAdmin.post(
    "/new",
    [
        validarJWT, 
        check("nombre", "el nombre es obligatorio").not().isEmpty(), 
        check("precio", "el precio es obligatorio").not().isEmpty(), 
        check("imagen", "la imagen es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    crearProducto
);

routerAdmin.get("/productos", validarJWT, cargarProductos)

routerAdmin.get("/usuarios", validarJWT, cargarUsuarios)

routerAdmin.delete('/eliminar/:id', validarJWT, eliminarProducto);

routerAdmin.put('/editar', validarJWT, editarProducto);

routerAdmin.put('/suspender', validarJWT, suspenderUsuario);

routerAdmin.put('/activar', validarJWT, activarUsuario);

module.exports = routerAdmin;