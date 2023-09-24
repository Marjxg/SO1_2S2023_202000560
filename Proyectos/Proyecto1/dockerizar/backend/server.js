const connect = require('express-myconnection')
const routes = require('./routes')
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()

// ----------- PUERTO -------------- 
app.set('port', process.env.PORT || 9000)

const DBconfig = {
    host: 'mysqldb',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'so1db'
}

const whiteList = ['http://frontend:3000', 'http://localhost:3000' ,'http://mysqldb:3306'];

app.use(cors())
app.use(connect(mysql, DBconfig, 'single'))
app.use(express.json())

// ----------- RUTAS -------------- 
app.get('/', (req, res)=>{
    res.send("prueba")
})
app.use('/api', routes)

// ----------- SERVIDOR CORRIENDO -------------- 
app.listen(app.get('port'), ()=>{
    console.log('Servidor corriendo en el puerto: ', app.get('port'))
});