const { Schema, model } = require('mongoose');


const RolSchema = Schema({
    role: {
        type: String,
        required: [true, 'El nombre es obligatorio!'],
        unique: true
    }
})


module.exports = model( 'Role', RolSchema );