const { Router } = require('express'); 
const { check } = require('express-validator');
const { postAuthLogin } = require('../controllers/auth.controller');

const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post(
    '/login', 
    [
        check( 'correo', 'Campo requerido').isEmail(),
        check( 'password', 'Campo requerido').not().isEmpty(),
        validarCampos
    ], 
    postAuthLogin
);

module.exports = router;