const express = require('express');
const config = require('./config');

const cors = require('cors')

// RUTAS

const gestion_cliente = require('./modulos/gestion_cliente/rutas');
const gestion_producto = require('./modulos/gestion_producto/rutas');
const gestion_categoria = require('./modulos/gestion_categoria/rutas');
const gestion_venta = require('./modulos/gestion_venta/rutas');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cors());

app.set('port', config.app.port);

app.use('/api/gestion_cliente', gestion_cliente);
app.use('/api/gestion_producto', gestion_producto);
app.use('/api/gestion_categoria', gestion_categoria);
app.use('/api/gestion_venta', gestion_venta);

module.exports = app;
