const db = require('../../db/mysql');

const TABLA = 'clientes';

 // Servicio
function obtenerClientes(){
    return db.obtenerDatos(TABLA);
}

function obtenerRegCliente(id){
    return db.obtenerRegistro(TABLA, id, 'id_clientes');
}

function agregarRegCliente(data){
    return db.agregarRegistro(TABLA, data);
}

function eliminarRegCliente(id){
    return db.eliminarRegistro(TABLA, id, 'id_clientes');
}

function actualizarRegCliente(data){
    return db.actualizarRegistro(TABLA, data, 'id_clientes');
}

module.exports = {
    obtenerClientes,
    obtenerRegCliente,
    agregarRegCliente,
    eliminarRegCliente,
    actualizarRegCliente,
}
