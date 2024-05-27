const db = require('../../db/mysql');

const TABLA = 'ventas';

 // Servicio
function obtenerVentas(){
    return db.obtenerDatos(TABLA);
}

function obtenerRegVenta(id){
    return db.obtenerRegistro(TABLA, id, 'id_productos');
}

function agregarRegVenta(data){
    return db.agregarRegistro(TABLA, data);
}

function eliminarRegVenta(id){
    return db.eliminarRegistro(TABLA, id, 'id_productos');
}

function actualizarRegVenta(data){
    return db.actualizarRegistro(TABLA, data, 'id_productos');
}

module.exports = {
    obtenerVentas,
    obtenerRegVenta,
    agregarRegVenta,
    eliminarRegVenta,
    actualizarRegVenta,
}
