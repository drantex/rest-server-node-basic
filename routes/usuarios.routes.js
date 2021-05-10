const { Router } = require('express'); 
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt.middlewares');
// // const { esAdminRol, esRol } = require('../middlewares/esAdminRol.middleware');

const {
    validarCampos,
    validarJWT,
    esAdminRol,
    esRol,
} = require('../middlewares')


const { 
    esRolValido, 
    esUsuarioPorCorreo,
    esUsuarioPorId
} = require('../helpers/db.helpers');

const { 
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios 
} = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', getUsuarios);

router.delete('/:id', [
    validarJWT,
    // esAdminRol,
    esRol('USER_ROLE', 'ADMIN_ROLE'),
    check( 'id', 'No es un id valido de mongo').isMongoId(),
    check( 'id', 'No existe en bd').custom( esUsuarioPorId ),
    validarCampos
],deleteUsuarios);

router.put('/:id', [
    check( 'id', 'No es un id valido de mongo').isMongoId().custom( esUsuarioPorId ),
    check( 'rol', 'rol required' ).custom( esRolValido ),
    validarCampos
],  putUsuarios);


router.post(
    '/', 
    [
        check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'password', 'Campo requerido, minimo 6 caracteres' ).isLength({ min: 6, max: 12}),
        check( 'correo', 'El campo no cumple con el formato de correo electronico' ).isEmail().custom( esUsuarioPorCorreo ),
        check( 'rol', 'rol required' ).custom( esRolValido ),
        validarCampos
    ], 
    postUsuarios 
);

module.exports = router;