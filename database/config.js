const mongoose = require('mongoose');

const dbConecction = async () => {
    try {
        await mongoose.connect(process.env.DB_CONECCTION);
        console.log("DB Conectado");
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo inicializar la base de datos")
    }
};

module.exports = { dbConecction };
