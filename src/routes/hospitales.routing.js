
/*
Router /api/hospitales
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitales, actualizarHospital, borrarHospital, crearHospital } = require('../controllers/hospitales.controller');

// Get hospitales
router.get( '/', validarJWT, getHospitales )

// Crear hospital
router.post( '/', [
    validarCampos,
    validarJWT,
    check('nombre', 'El nombre es necesario')
]
, crearHospital );

// Actualziar hospital
router.put( '/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
]
, actualizarHospital )

// Eliminar hospital
router.delete( '/:id', validarJWT, borrarHospital )

module.exports = router;