
/*
Router /api/medicos
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medico.controller');

// Get medicos
router.get( '/', validarJWT, getMedicos )

// Crear medico
router.post( '/', [
    validarCampos
]
, crearMedico );

// Actualziar medico
router.put( '/:id', [
    validarJWT,
    validarCampos
]
, actualizarMedico )

// Eliminar medico
router.delete( '/:id', validarJWT, borrarMedico )

module.exports = router;