import {
    actualizarUsuario,
    crearUsuario,
    eliminarUsuario,
    listarUsuarios,
} from '../controllers/usuariosController.js';

import express from 'express';

const router = express.Router();

router.get('/', listarUsuarios);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

export default router;
