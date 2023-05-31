const express = require("express");
const { dbConecction } = require("./database/config");
const app = express();
require("dotenv").config();
const cors = require("cors");

// Lectura de Parseo de Body
app.use(express.json());

// Iniciar Base de Datos
dbConecction();

// Cors
app.use(cors())

// Directorio Publico
app.use(express.static("public"));

// Sistema de Rutas
app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/pedidos", require("./routes/pedidos"));


// Llamar a mi Servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})