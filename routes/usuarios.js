const Router = require('express');
const {
    check
} = require('express-validator');
const {
    getUsuarios,
    addUsuario,
    updateUsuarios,
    deleteUsuario,
    getUsuario
} = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getUsuarios);
router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    addUsuario
);
router.put('/:id', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    updateUsuarios
);

router.delete('/:id', deleteUsuario);
router.get('/:id', getUsuario);

module.exports = router;