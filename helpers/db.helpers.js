const Role = require('../models/role.model');
const Usuario = require('../models/user.model');


const esRolValido = async (role) => {
    const existerol = await Role.findOne( { role });

    if ( !existerol ) {
        throw new Error( `El rol ${ role } no existe` );
    }
}


const esUsuarioPorCorreo = async (correo) => {
    console.log(' correo electronico: ', correo);
    const existeUsuario = await Usuario.findOne( { correo } );

    if ( existeUsuario ) {
        throw new Error( `El correo electronico ${ correo } ya esta en uso.` );
    }
}


const esUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById( id );

    if ( !existeUsuario ) {
        throw new Error( `El id ${ id } no existe` );
    }
}




module.exports = {
    esRolValido,
    esUsuarioPorCorreo,
    esUsuarioPorId
}