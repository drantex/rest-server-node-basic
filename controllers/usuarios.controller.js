const Usuario = require('../models/user.model');
const bcryptjs = require('bcryptjs');


const getUsuarios = async (req, res) => {

    const { limit = 10, desde = 0 } = req.query;
    const query = { estado: true };

    // const usuarios = await Usuario.find(query);
    // const totalRecorsd = await Usuario.countDocuments(query)
    //     .skip( Number(desde) )
    //     .limit( Number(limit) );

    const [totalRecorsd, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip( Number(desde) )
        .limit( Number(limit) ),
    ]);
    res.json({
        totalRecorsd,
        usuarios
    })
}


const postUsuarios = async (req, res) => {

    

    const { nombre, correo, password, rol } = req.body;
    
    
    const usuario = new Usuario({
        nombre, 
        correo, 
        password, 
        rol
    });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    await usuario.save();
    res.json({
        usuario
    })
}


const putUsuarios = async (req, res) => {
    
    const { id } = req.params;
    const { _id, password, google, correo, ...others } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, others );

    res.json({
        msg: 'put Api - controllers',
        id
    })
}


const deleteUsuarios = async (req, res) => {

    const {id} = req.params; 
    // const userDelete = await Usuario.findByIdAndDelete( id );
    const userDelete = await Usuario.findByIdAndUpdate( id, { estado : false} );
    res.json({
        userDelete
    })
}


module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}