const Router = require('express');
const { check } = require('express-validator');
const { getUsuarios, addUsuario, updateUsuarios, deleteUsuario, getUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//getall Usuarios
router.get('/', validarJWT, getUsuarios);

//Add Usuario
router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    addUsuario
);

//Update Usuario
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    updateUsuarios
);

//delete Usuario
router.delete('/:id', validarJWT, deleteUsuario);

//Getbyid
router.get('/:id', validarJWT, getUsuario);

module.exports = router;