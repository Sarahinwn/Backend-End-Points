require('dotenv').config();

const express = require('express');
const cors = require('cors');

//Alumnos
const app = express();
app.use(cors({
    origin: true
}));
app.use(express.json());

//Rutas
app.use('/api/alumnos', require('./routes/alumnos'));
app.use('/api/docentes', require('./routes/docentes'));
app.use('/api/materias', require('./routes/materias'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

//directorio publico
app.use(express.static('public'));

app.listen(process.env.PORT);