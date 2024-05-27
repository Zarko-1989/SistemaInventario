const db = require('../../db/mysql');

const TABLA = 'categorias';

 // Servicio
function obtenerCategorias(){
    return db.obtenerDatos(TABLA);
}

function obtenerRegCategoria(id){
    return db.obtenerRegistro(TABLA, id, 'id_categorias');
}

function agregarRegCategoria(data){
    return db.agregarRegistro(TABLA, data);
}

function eliminarRegCategoria(id){
    return db.eliminarRegistro(TABLA, id, 'id_categorias');
}

function actualizarRegCategoria(data){
    return db.actualizarRegistro(TABLA, data, 'id_categorias');
}

module.exports = {
    obtenerCategorias,
    obtenerRegCategoria,
    agregarRegCategoria,
    eliminarRegCategoria,
    actualizarRegCategoria,
}
