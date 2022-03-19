
/*
Router /api/usuarios
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controller');

// Get usuarios
router.get( '/', validarJWT, getUsuarios )

// Crear usuario
router.post( '/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
]
, crearUsuario );

// Actualizar usuario
router.put( '/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').notEmpty(),
    validarCampos
]
, actualizarUsuario )

router.delete( '/:id', validarJWT, borrarUsuario )

module.exports = router;