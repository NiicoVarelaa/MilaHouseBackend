const Producto = require("../model/productoModel");
const Usuario = require('../model/usuarioModel');

const crearProducto = async (req, res) => {
	console.log(req.body);
    try {
        let producto = new Producto(req.body);

		await producto.save();

		res.status(201).json({
			ok: true,
			msg: 'producto creado',
			producto,
		});
    } catch (error) {
        console.log(error);
		res.status(500).json({
			ok: true,
			msg: 'Hable con el administrador',
		});
    }
}

const cargarProductos = async (req, res) => {
	try {
		const productos = await Producto.find();
		res.status(200).json({
			ok: true,
			productos,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

const cargarUsuarios = async (req, res) => {
	try {
		const usuarios = await Usuario.find();
		res.status(200).json({
			ok: true,
			usuarios,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

const eliminarProducto = async (req, res) => {
	try {
		const productoEliminar = await Producto.findById(req.params.id);

		if (!productoEliminar) {
			return res.status(404).json({
				ok: false,
				msg: 'No Existe un Producto con este ID',
			});
		}

		await Producto.findByIdAndDelete(req.params.id);

		res.status(200).json({
			ok: true,
			msg: 'Producto Eliminado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Contactarse con un Administrador',
		});
	}
};

const editarProducto = async (req, res) => {
	try {
		const productoEditar = await Producto.findById(req.body._id);

		if (!productoEditar) {
			return res.status(404).json({
				ok: false,
				msg: 'No Existe ningun Producto con este ID',
			});
		}

		await Producto.findByIdAndUpdate(req.body._id, req.body);

		res.status(200).json({
			ok: true,
			msg: 'producto editado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Contactarse con un Administrador',
		});
	}
};

const suspenderUsuario = async (req, res) => {
	try {
		const banUsuario = await Usuario.findById(req.body._id);

		if (!banUsuario) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe ningun Producto con este Id',
			});
		}
		banUsuario.estado = "suspendido"

		await banUsuario.save();

		res.status(200).json({
			ok: true,
			msg: 'Usuario Suspendido',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el Administrador',
		});
	}
};

const activarUsuario = async (req, res) => {
	try {
		const banUsuario = await Usuario.findById(req.body._id);

		if (!banUsuario) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe ningun Producto con este Id',
			});
		}
		
		banUsuario.estado = "activo"
		await banUsuario.save();

		res.status(200).json({
			ok: true,
			msg: 'Usuario Suspendido',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el Administrador',
		});
	}
};


module.exports = {crearProducto, cargarProductos, cargarUsuarios, eliminarProducto, editarProducto, suspenderUsuario, activarUsuario}