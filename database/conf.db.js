const mongoose = require('mongoose');


const dbConection = async() => {
    try {
        mongoose.connect( process.env.MONGO_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Database Online')
    } catch (error) {
        console.error('Ocurrion un error');
        throw new Error('Se ha producido un error al intentarse conectar a la bd');
    }
}

module.exports = {
    dbConection
}