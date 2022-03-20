
/*
Router /api/uploads
*/

const { Router } = require('express');
const router = Router()
const expressFileUpload = require('express-fileupload');

const { fileUpload, retornarImagen } = require('../controllers/uploads.controller');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

router.use( expressFileUpload() );

// Get busqueda
router.put( '/:tipo/:id', validarJWT, fileUpload );

router.get( '/:tipo/:imagen', retornarImagen );

module.exports = router