
const expressPath = require('path')
const fs = require('fs')
const { response } = require("express")
const { v4: uuidv4 } = require("uuid")
const { actualizarImagen } = require("../helpers/actualizar-imagen")

const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo
    const id = req.params.id

    // Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios']
    if( !tiposValidos.includes( tipo ) ){
        res.json({
            ok: false,
            msg: 'No es un tipo médico, usuario u hospital'
        })
    }

    // Validar archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        })
    }

    // Procesar imagen
    const file = req.files.imagen

    // Extension
    const nombreCortado = file.name.split('.')
    const extension = nombreCortado[ nombreCortado.length-1 ]

    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']

    if( !extensionesValidas.includes( extension ) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        })
    }

    // Generar nombre
    const nombreArchivo = `${ uuidv4() }.${ extension }`

    // Fecha
    const today = new Date();

    const month = today.getMonth();
    const year = today.getFullYear()

    // Path para guardar imagen
    //const path = './src/uploads/' + tipo + '/' + year + '/' + '/'+nombreArchivo
    const path = './src/uploads/' + tipo + '/'+nombreArchivo


    // Use the mv() method to place the file somewhere on your server
    file.mv( path, (err) => {

        if (err){
            console.log( err )
            return res.status(500).json({
                ok: false,
                msg: 'Error al guardar imagen'
            })
        }

        // Actualizar imagen en la bd
        actualizarImagen( tipo, id, nombreArchivo )

        res.json({
            ok: true,
            msg: 'Imagen subida exitiosamente'
        })
    });
}

const retornarImagen = ( req, res = response ) => {

    const tipo = req.params.tipo
    const imagen = req.params.imagen

    const pathImg = expressPath.join( __dirname, '../uploads/'+ tipo + '/'+ imagen )

    // Imagen
    if( fs.existsSync( pathImg ) ){
        res.sendFile( pathImg )
    }else{

        // Imagen por defecto

        res.sendFile( expressPath.join( __dirname, '../uploads/no-image.jpg' ) )
    }


}

module.exports = {
    fileUpload,
    retornarImagen
}