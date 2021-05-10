const { request, response } = require("express");


const esAdminRol = (req = request, res = response, next ) => {
    if ( !req.usuario) {
        return res.status(500).json({
            msg: 'Se intenta validar el rol sin verificar el token'
        });
    }

    const { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `El usuario ${ nombre } no es SUPERADMIN`
        });
    }
        
    next();
}



const esRol = ( ...roles ) => {

    return (req = request, res = response, next ) => {
        console.log('Roles __> ', roles);

        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se intenta validar el rol sin verificar el token'
            });
        }


        if ( !roles.includes ( req.usuario.rol ) ) {
            return res.status(500).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        next();
    }
}


module.exports = {
    esAdminRol,
    esRol
}