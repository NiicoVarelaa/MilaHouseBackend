const { Schema, model } = require('mongoose');

const ProductoSeleccionadoSchema = Schema({
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
	},

	user: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
});

module.exports = model('ProductoSeleccionado', ProductoSeleccionadoSchema);