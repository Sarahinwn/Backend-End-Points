const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { querySingle } = require('../../dal/data-access');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    let usuario = null;
    const sqlParams = [{
        'name': 'email',
        'value': email
    }];

    usuario = await querySingle('stp_usuarios_login', sqlParams);

    if (!usuario) {
        res.status(400).json({
            ok: false,
            message: 'Email no encontrado'
        })
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'Contraseña incorrecta'
        });
    }

    const token = await generateJWT(usuario.idUsuario);

    res.json({
        ok: true,
        message: 'Acceso correcto',
        token: token
    });

}

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    let usuario = null;
    let sqlParams = null;


    try {
        const { name, email, picture } = await googleVerify(googleToken);
        console.log(name);
        sqlParams = [{
            'name': 'email',
            'value': email
        }];

        usuario = await querySingle('stp_usuarios_login', sqlParams);

        //verificasr si existe en BD
        if (!usuario) {
            //crear usuario

            sqlParams = [{
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'password',
                    'value': ''
                },
                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'facebook',
                    'value': 0
                },
                {
                    'name': 'nativo',
                    'value': 0
                },
                {
                    'name': 'imagen',
                    'value': picture
                },
            ];

            usuario = await querySingle('stp_usuarios_add', sqlParams);
            console.log(usuario);
        } else {
            //actualizar usuario
            sqlParams = [{
                    'name': 'nombre',
                    'value': usuario.name
                },
                {
                    'name': 'email',
                    'value': usuario.email
                },
                {
                    'name': 'password',
                    'value': usuario.password
                },
                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'facebook',
                    'value': 0
                },
                {
                    'name': 'nativo',
                    'value': 0
                },
                {
                    'name': 'imagen',
                    'value': usuario.picture
                },
            ];

            usuario = await querySingle('stp_usuarios_update', sqlParams);
        }

        const token = await generateJWT(usuario.idUsuario);

        res.json({
            ok: true,
            message: 'Acceso correcto',
            token: token
        });



    } catch (err) {
        res.status(401).json({
            ok: false,
            message: 'Hola',
            error: err
        })
    }
}

module.exports = {
    login,
    googleSignIn
}