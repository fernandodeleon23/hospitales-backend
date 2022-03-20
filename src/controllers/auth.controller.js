const { response } = require('express');
const bcryptjs = require('bcrypt');
const Usuario = require('../models/usuario.model');
const { generarJWt } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');



const login = async( req, res = response ) => {

    const { email, password } = req.body

    try{

        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ){

            // No existe el usuario
            res.status(404).json({
                ok: false,
                msg: 'Correo y/o contraseña incorrectos'
            })
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuarioDB.password );

        if( !validPassword ){

            // Contraseña incorrecta
            res.status(400).json({
                ok: false,
                msg: 'Correo y/o contraseña incorrectos'
            })
        }

        // Generar token
        const token = await generarJWt( usuarioDB.id );

        res.json({
            ok: true,
            token: token
        })

    }catch(err){
        console.log( err );
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }

}

const googleSignIn = async( req, res = response ) => {

    const googleToken = req.body.token

    try{

        const { name, email, picture } = await googleVerify( googleToken );

        // Verficar si existe el usuario
        const usuarioDb = await Usuario.findOne({email})
        let usuario;

        // Si no existe
        if( !usuarioDb ){

            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@@',
                img: picture,
                google: true
            });
        }else{

            // Existe
            usuario = usuarioDb;
            usuario.google = true
        }

        // Guardar
        await usuario.save();

        // Generar token
        const token = await generarJWt( usuario );

        res.json({
            ok: true,
            token
        })

    }catch(err){
        console.log(err) 
        res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}