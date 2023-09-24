const { json } = require('express')
const express = require('express')
const routes = express.Router()

/* Esta es para obtener las máquinas de la base de datos */
routes.get('/', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) {
            return res.status(404).json({ error: "error" });
        } else {
            connect.query('SELECT nombre_maquina FROM maquina', (err, rows) => {
                if (err) {
                    return res.status(404).json({ error: "error" });
                } else {
                    return res.status(200).json(rows);
                }
            })
        }
    })
})


/* Esta es para obtener información de la máquina
        y almacenarla en la base de datos */
routes.post('/modules', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) {
            return res.status(404).json({ error: "error" });
        }
        connect.query('INSERT INTO maquina SET ?', [req.body], (err, rows) => {
            if (err) {
                return res.status(404).json({ error: "error" });
            }
            return res.status(200).json({ msg: "ok" });
        })
    })
})

/* Esta es para obtener información de la máquina
        y almacenarla en la base de datos */
routes.post('/procesess', (req, res) => {
    console.log(req.body.procesos)
    const processInfo = req.body.procesos.map((data) => {
        return [
            data.pid,
            data.nombre_p,
            data.usuario_p,
            data.estado_p,
            data.ram_p,
            data.FK_nombre_maquina
        ];
    });
    console.log(processInfo)
    req.getConnection((err, connect) => {
        if (err) {
            return res.status(404).json({ error: "error" });
        }
        connect.query('INSERT INTO proceso (pid, nombre_p, usuario_p, estado_p, ram_p, FK_nombre_maquina) VALUES?;', [processInfo], (err, result) => {
            console.log(err)
            if (err) {
                return res.status(400).json({ error: "error" });
            }
            res.status(200).json({
                status: "success",
                message: "Data inserted"
            })
        })
    })
})

/* Ruta para obtener la máquina seleccionada
 y responder con información de la máquina */
routes.post('/machine', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) {
            return res.status(404).json({ error: "error" });
        }
        connect.query('SELECT cpu, ram FROM maquina WHERE nombre_maquina = ?', [req.body.choices], (err, rows) => {
            if (err) {
                return res.status(404).json({ error: "error" });
            }
            return res.status(200).json(rows);
        })
    })
})

/* Ruta para obtener la máquina seleccionada
 y responder con información de procesos */
routes.post('/process', (req, res) => {
    req.getConnection((err, connect) => {
        if (err) {
            return res.status(404).json({ error: "error" });
        }
        connect.query('SELECT * FROM proceso WHERE FK_nombre_maquina = ?', [req.body.choices], (err, rows) => {
            if (err) {
                return res.status(404).json({ error: "error" });
            }
            return res.status(200).json(rows);
        })
    })
})

/*
routes.delete('/:id', (req, res)=>{
    req.getConnection((err, connect)=>{
        if (err) return res.send(err)
        connect.query('DELETE FROM maquinas WHERE id_machine = ?', [req.params.id], (err,rows)=>{
            if (err) return re.send(err)
            res.json(rows)
        })
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, connect)=>{
        if (err) return res.send(err)
        connect.query('UPDATE maquinas SET ? WHERE id_machine = ?', [req.body, req.params.id], (err,rows)=>{
            if (err) return re.send(err)
            res.json(rows)
        })
    })
})*/

module.exports = routes