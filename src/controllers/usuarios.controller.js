
const { response } = require('express');
const req = require('express/lib/request');
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcrypt');
const { generarJWt } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    
    const [usuarios, total ] = await Promise.all([

        Usuario.find({}, 'nombre email img role google')
        .skip( desde )
        .limit( 5 ),

        Usuario.countDocuments()
    ])

    res.send({
        usuarios,
        uid: req.uid,
        total
    });
}

const crearUsuario = async (req, res = response) => {

    const { nombre, password, email } = req.body

    try{

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: true,
                message: 'El email existe'
            })
        }

        const usuario = new Usuario(req.body)

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt )

        // Guardar
        await usuario.save();

        // Generar token
        const token = await generarJWt( usuario.id );
            
        res.json({
            ok: true,
            usuario,
            token
        })

    }catch(err){
        console.log( err )

        res.status(500).json({
            ok: false,
            message: 'error inesperado'
        })
    }
}

const actualizarUsuario = async ( req, res ) => {

    const uid = req.params.id

    try{

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                message: 'Usuario no existe'
            })
        }

        // Validar token

        // Guardar
        const { password, google, email, ...campos } = req.body

        if( usuarioDB.email != email ){

            const existeEmail = await Usuario.findOne({ email });

            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está en uso'
                })
            }
        }

        campos.email = email
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos,  { new: true } );

        res.json({
            message: 'Usuario actualizado',
            usuario: usuarioActualizado
        })

    }catch(err){
        res.status(500).json({
            ok: false,
            message: 'error inesperado'
        })
    }

}

const borrarUsuario = async( req, res ) => {

    const { id } = req.params

    try{

        const existeUsuario = await Usuario.findById( id );

        if( existeUsuario ){

            const usuario = await Usuario.findByIdAndRemove( id )

            res.status(200).json({
                ok: true,
                message: 'Usuario eliminado'
            })

        }else{
            res.status(500).json({
                ok: false,
                message: 'El usuario no existe'
            })
        }

    }catch(err){
        console.log( err )
        res.status(500).json({
            ok: false,
            message: 'error inesperado'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}