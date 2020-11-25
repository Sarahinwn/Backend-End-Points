//Ruta api/alumnos

const Router = require('express');
const conString = require('../dal/config');
const sql = require('mssql');

const router = Router();
//get all
router.get('/', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request().execute('stp_alumnos_getall');
    }).then(result => {
        res.json(result.recordset);
    }).catch(err => {
        res.json(err);
    });
});
//get by id
router.get('/:id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idAlumno', req.params.id)
            .execute('stp_alumnos_getbyid');
    }).then(result => {
        res.json(result.recordset[0]);
    }).catch(err => {
        res.json(err);
    });
});
//Alumnos add
router.post('/', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('nombre', req.body.nombre)
            .input('edad', req.body.edad)
            .input('sexo', req.body.sexo)
            .input('semestre', req.body.semestre)
            .input('carrera', req.body.carrera)
            .execute('stp_alumnos_add');
    }).then(result => {
        res.status(201).json({
            status: "OK",
            msg: "Alumno agregado correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});

//Alumnos delete
router.delete('/:id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(res);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idAlumno', req.params.id)
            .execute('stp_alumnos_delete');
    }).then(result => {
        res.status(201).json({
            status: "OK",
            msg: "Alumno eliminado correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});

//Alumnos Update
router.put('/:id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(res);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idAlumno', req.params.id)
            .input('nombre', req.body.nombre)
            .input('edad', req.body.edad)
            .input('sexo', req.body.sexo)
            .input('semestre', req.body.semestre)
            .input('carrera', req.body.carrera)
            .execute('stp_alumnos_update');
    }).then(result => {
        res.status(201).json({
            status: "OK",
            msg: "Alumno actualizado correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});
module.exports = router;