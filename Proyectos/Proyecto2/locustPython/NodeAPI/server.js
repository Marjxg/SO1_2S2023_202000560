const express = require('express');
const router = express.Router();

const app = express();

// Settings 
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use('/', router);

router.post('/', async (req, res) => {
    const { carne, nombre, curso, nota, semestre, year} = req.body;
    console.log({carne: carne, nombre: nombre, curso: curso, nota: nota, semestre: semestre, year: year});
    res.json({carne: carne, nombre: nombre, curso: curso, nota: nota, semestre: semestre, year: year});
});

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});