const express = require("express");

const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {

    //  X-Token Headers
    const token = req.header("x-token");

    if (!token) {
		return res.status(401).json({
			ok: false,
			msg: "No hay Token en la Peticion",
		});
	}

    try {
		const payload = jwt.verify(token, process.env.SECRET_JWT);

		req.id = payload.id;
		req.name = payload.name;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Su Token no es valido',
		});
	}

	next();
}

module.exports = {
	validarJWT,
};