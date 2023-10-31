const { json } = require('express')
const express = require('express')
const routes = express.Router()

/* Esta es para obtener los datos de la base de datos */
routes.get('/getData', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) {
            return res.status(404).json({ error: "error" });
        } else {
            connect.query('SELECT * FROM alumno INNER JOIN calificacion ON alumno.carnet = calificacion.carnet ORDER BY calificacion.año, calificacion.semestre', [], (err, rows) => {
                if (err) {
                    return res.status(404).json({ error: "error" });
                } else {
                    return res.status(200).json(rows);
                }
            })
        }
    })
})

/* Esta ruta obtiene los nombres de los cursos almacenados en la base de datos */
routes.get('/getCourses', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) {
            return res.status(404).json({ error: "error" });
        } else {
            connect.query('SELECT DISTINCT nombre_curso FROM calificacion ORDER BY nombre_curso;', [], (err, rows) => {
                if (err) {
                    return res.status(404).json({ error: "error" });
                } else {
                    return res.status(200).json(rows);
                }
            })
        }
    })
})

/* Esta ruta obtiene los años almacenados en la base de datos */
routes.get('/getYears', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) {
            return res.status(404).json({ error: "error" });
        } else {
            connect.query('SELECT DISTINCT año FROM calificacion ORDER BY año;', [], (err, rows) => {
                if (err) {
                    return res.status(404).json({ error: "error" });
                } else {
                    return res.status(200).json(rows);
                }
            })
        }
    })
})

/* Esta ruta obtiene los semestres almacenados en la base de datos */
routes.get('/getSemesters', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) {
            return res.status(404).json({ error: "error" });
        } else {
            connect.query('SELECT DISTINCT semestre FROM calificacion ORDER BY semestre;', [], (err, rows) => {
                if (err) {
                    return res.status(404).json({ error: "error" });
                } else {
                    return res.status(200).json(rows);
                }
            })
        }
    })
})

/* Obtener el año y semestre para obtener mejores promedios */
routes.post('/average', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) {
            return res.status(404).json({ error: "error" });
        }
        connect.query('SELECT a.carnet, a.nombre, AVG(c.nota) as promedio FROM alumno a JOIN calificacion c ON a.carnet = c.carnet WHERE c.semestre = ? AND c.año = ? GROUP BY a.carnet, a.nombre ORDER BY promedio DESC LIMIT 5;', [req.body.semester, req.body.year], (err, rows) => {
            if (err) {
                return res.status(404).json({ error: "error" });
            }
            return res.status(200).json(rows);
        })
    })
})

/* Obtener el año y semestre para obtener cursos con más estudiantes */
routes.post('/mostStudents', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) {
            return res.status(404).json({ error: "error" });
        }
        connect.query('SELECT c.nombre_curso, COUNT(*) as cantidad FROM calificacion c WHERE c.semestre = ? AND c.año = ? GROUP BY c.nombre_curso ORDER BY cantidad DESC LIMIT 3;', [req.body.semester, req.body.year], (err, rows) => {
            if (err) {
                return res.status(404).json({ error: "error" });
            }
            return res.status(200).json(rows);
        })
    })
})

/* Obtener el año, semestre Y curso para obtener el porcentaje de aprobados */
routes.post('/approved', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) {
            return res.status(404).json({ error: "error" });
        }
        connect.query('SELECT COUNT(*) * 100 / (SELECT COUNT(*) FROM calificacion WHERE año = ? AND semestre = ? AND nombre_curso = ? ) as porcentaje_aprobacion FROM calificacion WHERE año = ? AND semestre = ? AND nombre_curso = ? AND nota > 61;', [req.body.year, req.body.semester, req.body.course, req.body.year, req.body.semester, req.body.course], (err, rows) => {
            if (err) {
                return res.status(404).json({ error: "error" });
            }
            return res.status(200).json(rows);
        })
    })
})
module.exports = routes