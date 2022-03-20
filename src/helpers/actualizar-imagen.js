
const fs = require('fs')
const Hospital = require("../models/hospital.model")
const Medico = require("../models/medico.model")
const Usuario = require("../models/usuario.model")

const borrarImagen = ( path ) =>{

    if( fs.existsSync( path ) ){
        fs.unlinkSync( path )
    }
}

const actualizarImagen = async ( tipo, id, nombreArchivo ) =>{

    switch(tipo ){
        case 'medicos':
            const medico = await Medico.findById(id)

            if(! medico ){
                console.log('no es un médico')
                false
            }
            
            
            // Eliminar imagen anterior

            borrarImagen( './src/uploads/medicos/'+ medico.img )

            medico.img = nombreArchivo

            await medico.save();

            return true
        break;

        case 'hospitales':
            const hospital = await Hospital.findById(id)

            if(! hospital ){
                console.log('no es un hospital')
                false
            }            
            
            // Eliminar imagen anterior

            borrarImagen( './src/uploads/hospitales/'+ hospital.img )

            hospital.img = nombreArchivo

            await hospital.save();

            return true
        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id)

            if(! usuario ){
                console.log('no es un usuario')
                false
            }            
            
            // Eliminar imagen anterior

            borrarImagen(  './src/uploads/usuarios/'+ usuario.img )

            usuario.img = nombreArchivo

            await usuario.save();

            return true
        break;
    }

}

module.exports = {
    actualizarImagen
}