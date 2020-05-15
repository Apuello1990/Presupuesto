const express = require('express');
const conectarDB= require('./config/db');
const cors = require('cors')

//Crear el servidor
const app = express();

//Conectar a la DB
conectarDB();

//Habilitar cors
app.use(cors());

//Habiltiar express.json
app.use(express.json({extend:true}));


//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/presupuestos', require('./routes/presupuestos'));
app.use('/api/gastos', require('./routes/gastos'));



//arrancar la app
app.listen(PORT, () =>{
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
})