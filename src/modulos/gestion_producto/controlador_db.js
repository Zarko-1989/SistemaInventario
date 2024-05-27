const db = require('../../db/mysql');

const TABLA = 'productos';

 // Servicio
function obtenerProductos(){
    return db.obtenerDatos(TABLA);
}

function obtenerRegProducto(id){
    return db.obtenerRegistro(TABLA, id, 'id_productos');
}

function agregarRegProducto(data){
    return db.agregarRegistro(TABLA, data);
}

function eliminarRegProducto(id){
    return db.eliminarRegistro(TABLA, id, 'id_productos');
}

function actualizarRegProducto(data){
    return db.actualizarRegistro(TABLA, data, 'id_productos');
}

module.exports = {
    obtenerProductos,
    obtenerRegProducto,
    agregarRegProducto,
    eliminarRegProducto,
    actualizarRegProducto,
}
