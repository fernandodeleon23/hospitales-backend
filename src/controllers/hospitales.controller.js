
const { response } = require('express')

const Hospital = require('../models/hospital.model')
const { renewToken } = require('./auth.controller')

const getHospitales = async ( req, res = response ) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img')

    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async ( req, res = response ) => {

    const uid = req.uid
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    })

    try{

        const hospitalGuardado = await hospital.save()

        res.json({
            ok: true,
            hospital: hospitalGuardado
        })

    }catch(err){

        console.log( err )

        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarHospital = async( req, res = response ) => {

    const id = req.params.id
    const uid = req.uid
    
    try{

        const hospital = await Hospital.findById( id );

        if( !hospital ){

            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            })
        }

        const cambiosHopistal = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHopistal, {new: true} );

        res.json({
            ok: true,
            msg: 'actualizarHospital',
            hospitalActualizado
        })

    }catch(err){

        console.log(err)

        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar hospital'
        })
    }
}

const borrarHospital = async( req, res = response ) => {

    const id = req.params.id
    const uid = req.uid
    
    try{

        const hospital = await Hospital.findById( id );

        if( !hospital ){

            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            })
        }

        await Hospital.findByIdAndDelete( id )

        res.json({
            ok: true,
            msg: 'hospitalEliminado'
        })

    }catch(err){

        console.log(err)

        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar hospital'
        })
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}