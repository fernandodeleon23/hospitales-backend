/*
Router /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').notEmpty(),
        validarCampos
    ],
    login
)

router.post( '/google',
    [
        check('token', 'El token de Google es obligatorio').notEmpty(),
        validarCampos
    ],
    googleSignIn
)

module.exports = router