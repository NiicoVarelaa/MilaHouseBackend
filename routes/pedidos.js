const express = require('express');
const { validarJWT } = require('../middlewares/validarJwt');
const {
    pedidoProducto,
    cargarProductoSelecionados,
    sacarPedido,
    guardarPedido,
    cargarAllProducto,
} = require('../controllers/pedidos');


const routerPedidos = express.Router();

routerPedidos.post('/guardarPedido', validarJWT, pedidoProducto);

routerPedidos.get('/', validarJWT, cargarProductoSelecionados);

routerPedidos.delete('/:id', validarJWT, sacarPedido);

routerPedidos.post('/pedido', validarJWT, guardarPedido);

routerPedidos.get('/cargarProductos', validarJWT, cargarAllProducto);



module.exports = routerPedidos;