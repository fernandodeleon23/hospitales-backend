
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

const actualizarMedico = async( req, res = response ) => {

    const id = req.params.id
    const uid = req.uid

    try{

        const medico = await Medico.findById( id )

        if( !medico ){
            res.status(404).json({
                ok: false,
                msg: 'El médico no existe'
            })
        }

        const camposMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findOneAndUpdate( id, camposMedico, {new: true} )

        res.json({
            ok:true,
            msg: 'Médico actualizado',
            medicoActualizado
        })

    }catch(err){
        console.log(err)

        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar médico'
        })
    }
}

const borrarMedico = async( req, res = response ) => {

    const id = req.params.id

    try{

        const medico = Medico.findOne( id );

        if( !medico ){
            res.json({
                ok: false,
                msg: 'Médico no encontrado'
            })
        }

        await Medico.findByIdAndDelete( id )

        res.json({
            ok: true,
            msg: 'Médico eliminado'
        })

    }catch(err){
        console.log(err)

        res.json({
            ok: false,
            msg: 'Error al borrar médico'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}