const connect = require('express-myconnection');
const routes = require('./routes')
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()
const { Server } = require('socket.io')
const http = require('http')
const redis = require('ioredis')

// ----------- PUERTO -------------- 
app.set('port', process.env.PORT || 9000)
app.use(cors())

//------------ SERVER ---------------
const server = http.createServer(app);

//-----------  IO -------------
const io = new Server(server, {
  cors: {
    origin: ["https://so1-2s2023-202000560-5nw76nzltq-uc.a.run.app", "https://so1-2s2023-202000560-5nw76nzltq-uc.a.run.app/TiempoReal"],
    methods: ["GET", "POST"],
  },
});

// ----------MYSQL ---------------
const DBconfig = {
  host: '34.73.179.70',
  port: 3306,
  user: 'admin',
  password: 'Admin123.',
  database: 'calificaciones'
}

// ---------- REDIS -----------
const client = redis.createClient({ host: 'redis-db', port: 6379 }) //colocarle puerto, host

app.use(connect(mysql, DBconfig, 'single'))
app.use(express.json())

// ---------- SOCKET -------------
io.on('connection', (socket) => {
  console.log('Conexión a SOCKET IO correcta');

  const sendData = async () => {
    try {
      const allScoreKeys = await client.keys('notas:*');
      const courses = []
      const years = []
      const semesters = []
      for (const onekey of allScoreKeys) {
        const course = await client.hget(onekey, "curso");
        const year = await client.hget(onekey, "year");
        const semestre = await client.hget(onekey, "semestre");
        if (!courses.includes(course)) {
          courses.push(course)
        }
        if (!years.includes(year)) {
          years.push(year)
        }
        if (!semesters.includes(semestre)) {
          semesters.push(semestre)
        }
      }
      socket.emit('quantity', allScoreKeys.length);
        socket.emit('allCourses', courses);
        socket.emit('allYears', years);
        socket.emit('allSemesters', semesters);
    } catch (error) {
      console.error('Error en Socket IO:', error.message);
    }
  };
  sendData()

  socket.on("Selections", (data) => {
    data = JSON.parse(data)
    const sendData = async () => {
      try {
        const students = await client.keys('notas:*:'+data['course']+':'+data['semester']+':*');
        socket.emit("Students", {"val": students.length, "selected": data['course']})
      } catch (error) {
        console.error('Error en Socket IO:', error.message);
      }
    };
    sendData()
  })

});

// ----------- RUTAS -------------- 
app.get('/', (req, res) => {
  res.send("prueba")
})
app.use('/api', routes)

// ----------- SERVIDOR CORRIENDO -------------- 
server.listen(app.get('port'), () => {
  console.log('Servidor corriendo en el puerto: ', app.get('port'))
});