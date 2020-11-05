const response = require('express');
const conString = require('../database/config');
const sql = require('mssql');


//Obtener Usuarios
const getUsuarios = async(req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request().execute('stp_usuarios_getall');
    }).then(result => {
        //const res = result.recordset;
        res.json({
            ok: true,
            usuarios: result.recordset[0]
        });
    }).catch(err => {
        res.json(err);
    });
};


//agregar usuarios
const addUsuario = async(req, res = response) => {
    const { nombre, email, password } = req.body;
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });


    // combrobasr si exite el correo
    // Agregar el usuario 
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('nombre', nombre)
            .input('email', email)
            .input('password', password)
            .execute('stp_usuarios_add');
    }).then(result => {
        // const res = result.recordset[0];
        res.status(201).json({
            ok: true,
            usuario: result.recordset[0]
        });
    }).catch(err => {
        res.json(err);
    });
};

module.exports = {
    getUsuarios,
    addUsuario
};