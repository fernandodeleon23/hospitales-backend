
/*
Router /api/busqueda
*/

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator');

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas.controller');

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

// Get busqueda
router.get( '/:busqueda', validarJWT, getTodo );

// Get busqueda
router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion );

module.exports = router