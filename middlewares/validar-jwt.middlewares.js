const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user.model')


/**
 * @name validarJWT
 * @description Middleware encargado de validar si el jwt enviado por los headers
 *              es correcto.
 * @param {request} req 
 * @param {response} response 
 * @param {callback} next 
 */
const validarJWT = async (req = request, res= response, next) => {

    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            msg: 'No existe token en la petición.'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETKEY);
        const usuario = await Usuario.findOne( {_id : uid, estado: true} );

        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Usuario no valido!!'
            });
        }
        req.usuario = usuario;

        next();
    } catch (error) {
        console.log('Error: ', error);
        res.status(401).json({
            msg: 'Token no valido!!'
        })
    }
}



module.exports = {
    validarJWT
}