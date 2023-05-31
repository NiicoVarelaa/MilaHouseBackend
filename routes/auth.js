const express = require("express");
const { check } = require("express-validator");
const { crearUsuario, loginUsuario } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCampos");
const routerAuth = express.Router();


routerAuth.post("/new", 
    [
        check("nombre", "el nombre es obligatorio").not().isEmpty().isLength({min: 3, max: 20}).isAlpha(),
        check("apellido", "el apellido es obligatorio").not().isEmpty().isLength({min: 3, max: 20}).isAlpha(), 
        check("email", "ingrese un email valido").not().isEmpty().isEmail().isLength({max: 30}), 
        check("password", "la contraseña debe ser mayor a 5 caracteres").isLength({min: 6, max: 20}),
        validarCampos
    ],
    crearUsuario);

routerAuth.post("/",
    [
        check("email", "el email es obligatorio").not().isEmpty().isEmail(),
        check("password", "la contraseña es obligatoria").not().isEmpty(),
        validarCampos,
    ],
    loginUsuario);

module.exports = routerAuth;