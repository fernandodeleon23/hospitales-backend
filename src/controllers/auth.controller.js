const { response } = require('express');
const bcryptjs = require('bcrypt');
const Usuario = require('../models/usuario.model');
const { generarJWt } = require('../helpers/jwt');


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

module.exports = {
    login
}