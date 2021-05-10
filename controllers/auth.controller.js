const { response } = require('express');
const Usuario = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generarJDT } = require('../helpers/jwt.helpers')

const postAuthLogin = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        
        if ( !usuario ) {
            return res.status(400).json({
                msg: "Error, el usuario no existe!!"
            });
        }
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: "Error, el usuario no esta activo!!"
            });
        }

        const validatePassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validatePassword ) {
            return res.status(400).json({
                msg: "Error, La contraseña no es valida!!"
            });
        }

        const token = await generarJDT( usuario.id );
        
        res.json({
            msg: "Exito",correo, password, token, usuario
        });


    } catch (error) {
        res.status(500).json({
            msg: "Error, ocurrio un error inesperado."
        });
    }
    
}



module.exports = {
    postAuthLogin
}