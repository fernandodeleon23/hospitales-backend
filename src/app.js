
const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const { dbConnection } = require('./database/config')

const app = express()

// CORS
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Lectura y parseo del body
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));

// Base de datos
dbConnection();

// Rutas
app.use( '/api/usuarios', require('./routes/usuarios.routing') );
app.use( '/api/hospitales', require('./routes/hospitales.routing') );
app.use( '/api/medicos', require('./routes/medicos.routing') );

app.use( '/api/login', require('./routes/auth.routing') );

app.listen( process.env.PORT, ()=>{
    console.log( 'App corriendo' )
})