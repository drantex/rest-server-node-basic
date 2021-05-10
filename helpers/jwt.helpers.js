const jdt = require('jsonwebtoken');


const generarJDT = ( uid ) => {
    return new Promise( (resolve, reject) => {
        
        const payload = { uid };
        
        jdt.sign( payload, process.env.SECRETKEY, {
            expiresIn: '4h'
        }, (err, token ) => {
            if ( err ) {
                console.log( error );
                reject( 'No se logró generar el token' );
            } else {
                resolve( token );
            }
        });
    });
}

module.exports = {
    generarJDT
}