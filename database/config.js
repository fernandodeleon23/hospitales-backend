
const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Conectado a la bd')

    }catch(err){
        console.log(err);
        throw new Error('Error al iniciar la bd')
    }
    
}

module.exports = {
    dbConnection
}