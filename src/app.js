
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('../database/config')

const app = express()

// CORS
app.use( cors )

// Base de datos
dbConnection();

// Rutas
app.use('/', (req, res)=>{
    res.send('Hola')
})

app.listen( process.env.PORT, ()=>{
    console.log( 'App corriendo' )
})