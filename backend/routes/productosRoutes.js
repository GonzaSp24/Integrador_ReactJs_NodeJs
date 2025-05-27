import {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    listarProductos,
} from '../controllers/productosController.js';

import express from 'express';

const router = express.Router();

router.get('/', listarProductos);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

export default router;
