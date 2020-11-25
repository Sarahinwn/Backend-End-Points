const response = require('express');
const conString = require('../../dal/config');
const sql = require('mssql');
const bcrypt = require('bcryptjs');

//Obtener Usuarios
const getUsuarios = async(req, res) => {
        sql.on('error', err => {
            console.log(err);
            res.json({
                ok: false,
                error: err
            });
        });
        sql.connect(conString).then(pool => {
            return pool.request().execute('stp_usuarios_getall');
        }).then(result => {
            //const res = result.recordset;
            res.json({
                ok: true,
                usuarios: result.recordset
            });
        }).catch(err => {
            res.json({
                ok: false,
                error: err
            });
        });
    }
    //agregar usuarios
const addUsuario = async(req, res = response) => {
    const { nombre, email, password } = req.body;
    sql.on('error', err => {
        console.log(err);
        res.json({
            ok: false,
            error: err
        });
    });
    //Encryptar password
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);
    // Agregar el usuario 
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('nombre', nombre)
            .input('email', email)
            .input('password', newPassword)
            .execute('stp_usuarios_add');
    }).then(result => {
        // const res = result.recordset[0];
        res.status(201).json({
            ok: true,
            usuario: result.recordset[0]
        });
    }).catch(err => {
        res.json({
            ok: false,
            error: err
        });
    });
}

//getbyid
const getUsuario = async(req, res) => {
    const idUsuario = req.params.id;
    sql.on('error', err => {
        console.log(err);
        res.json({
            ok: false,
            error: err
        });
    });
    // combrobasr si exite el correo
    // Agregar el usuario 
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idUsuario', idUsuario)
            .execute('stp_usuarios_getbyid');
    }).then(result => {
        // const res = result.recordset[0];
        res.status(201).json({
            ok: true,
            usuario: result.recordset[0]
        });
    }).catch(err => {
        res.json({
            ok: false,
            error: err
        });
    });
}

const updateUsuarios = async(req, res) => {
    const { nombre, email, password } = req.body;
    const idUsuario = req.params.id;
    sql.on('error', err => {
        console.log(err);
        res.json({
            ok: false,
            error: err
        });
    });
    // combrobasr si exite el correo
    // Agregar el usuario 
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idUsuario', idUsuario)
            .input('nombre', nombre)
            .input('email', email)
            .input('password', password)
            .execute('stp_usuarios_update');
    }).then(result => {
        // const res = result.recordset[0];
        res.status(201).json({
            ok: true,
            usuario: result.recordset[0]
        });
    }).catch(err => {
        res.json({
            ok: false,
            error: err
        });
    });
}

const deleteUsuario = async(req, res) => {
    const idUsuario = req.params.id;
    sql.on('error', err => {
        console.log(err);
        res.json({
            ok: false,
            error: err
        });
    });
    // combrobasr si exite el correo
    // Agregar el usuario 
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idUsuario', idUsuario)
            .execute('stp_usuarios_delete');
    }).then(result => {
        // const res = result.recordset[0];
        res.status(201).json({
            ok: true,
            msg: "Usuario Eliminado correctamente"
        });
    }).catch(err => {
        res.json({
            ok: false,
            error: err
        });
    });
}

module.exports = {
    getUsuarios,
    addUsuario,
    getUsuario,
    updateUsuarios,
    deleteUsuario
}