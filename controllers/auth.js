const Usuario = require("../model/usuarioModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const crearUsuario = async (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: "ya existe un usuario con este email",
            });
        }

        usuario = new Usuario(req.body);

        // Encriptar Contraseñas

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar Usuario en DB
        await usuario.save();

        // Generar JWT
        const payload = {
            id: usuario._id,
			name: usuario.name,
			rol: usuario.rol,
        }
        
        const token = jwt.sign(payload, process.env.SECRET_JWT, {
			expiresIn: '1h',
		});

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            rol: usuario.rol,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:"Por favor contacte un Administrador",
        });
    }
};

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Validando Si Existe el Usuario
        const usuario = await Usuario.findOne({email});

        // Si el Usuario no Existe...
        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El email o password son Incorrectos"    
            });
        }

        

        // Confirmar Password
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        
        if (!validarPassword){
            return res.status(400).json({
                ok: false,
                msg: "El Email o Password son Incorrectos"
            });
        }

        if (usuario.estado === "suspendido") {
            return res.status(401).json({
                ok: false,
                msg: "El usuario fue suspendido contactese con el Admin"
            })
        } 

        // Generar JWT
        const payload = {
            id: usuario._id,
			name: usuario.name,
			rol: usuario.rol,
        }
        
        const token = jwt.sign(payload, process.env.SECRET_JWT, {
			expiresIn: '3h',
		});

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            rol: usuario.rol,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:"Por favor contacte un Administrador",
        });
    }
};

module.exports = {
    crearUsuario,
    loginUsuario,
}