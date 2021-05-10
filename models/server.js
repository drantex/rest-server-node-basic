
const cors = require('cors');
const express = require('express');
const { dbConection } = require('../database/conf.db')

class Server {
    
    app;
    port;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        //Connect db
        this.connectDb();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async connectDb() {
        await dbConection();
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }
    
    routes() {
        this.app.use('/auth', require('../routes/auth.routes'))
        this.app.use('/api/usuarios', require('../routes/usuarios.routes'))
    }

    listen() {
        this.app.listen( process.env.PORT , ()=> {
            console.log('server run : ', process.env.PORT);
        })
    }

}

module.exports = Server;