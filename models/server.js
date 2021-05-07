
const cors = require('cors');
const express = require('express');

class Server {
    
    app;
    port;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }
    
    routes() {
        this.app.use('/api/usuarios', require('../routes/usuarios.routes'))
    }

    listen() {
        this.app.listen( process.env.PORT , ()=> {
            console.log('server run : ', process.env.PORT);
        })
    }

}

module.exports = Server;