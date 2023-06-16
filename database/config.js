const mongoose = require('mongoose');

require('dotenv').config();

const credenciales = process.env.DB_CONECCTION;
console.log('db',credenciales);

const dbConecction = async () => {
    try {   
        await mongoose.connect(process.env.DB_CONECCTION, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("DB Conectado");
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo inicializar la base de datos")
    }
};

module.exports = { dbConecction };
