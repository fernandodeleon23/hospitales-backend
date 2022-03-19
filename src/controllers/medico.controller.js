
const { response } = require('express')
const Medico = require('../models/medico.model')

const getMedicos = async ( req, res = response ) => {

    const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre')

    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async ( req, res = response ) => {

    const uid = req.uid
    const medico = new Medico({
        usuario: uid,
        ...req.body
    })

    try{

        const medicoDb = await medico.save()

        res.json({
            ok: true,
            medico: medicoDb
        })

    }catch(err){

        console.log(err)

        res.status(500).json({
            ok: false,
            msg: 'Error al crear el médico'
        })

    }
}

const actualizarMedico = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const borrarMedico = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}