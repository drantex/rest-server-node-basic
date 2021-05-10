const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt.middlewares');
const esAdminRol = require('../middlewares/esAdminRol.middleware');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...esAdminRol
}