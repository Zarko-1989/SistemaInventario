const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

var conexion;

function conectarBD() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.log("Error en la conexión BD:" + err.message);
            setTimeout(conectarBD, 200);// Intentar reconectar en 200 milisegundos.
        } else {
            console.log("Conexión exitosa a la base de datos");
        }
    });


    conexion.on('error', (err) => {
        console.log("Se ha perdido la conexión a MySQL: " + err.message);
        if(err.code === 'PROTOCOL_CONNNECTION_LOST') {
            conectarBD();
        } else {
            throw err;
        }
    });
}

conectarBD();

// SELECCIONAR textDecoration: 
function obtenerDatos(tabla) {
    return new Promise ((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (err, result) => {
            return !err ? resolve(result) : reject(console.log(`Algo salió mal en la consulta: ${err}`));
        })
    })
}

function obtenerRegistro(tabla, id, codigo) {
    return new Promise ((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ${codigo} = ${id}`, (err, result) => {
            return !err ? resolve(result) : reject(console.log(`Algo salió mal en la consulta: ${err}`));
        });
    });
}

function agregarRegistro(tabla, data) {
    return new Promise ((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data , (err, result) => {
            return !err ? resolve(result) : reject(console.log(`Algo salió mal en la consulta: ${err}`));
        });
    });
}

function eliminarRegistro(tabla, id, codigo) {
    return new Promise ((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE ${codigo} = ${id}`, (err, result) => {
            return !err ? resolve(result) : reject(console.log(`Algo salió mal en la eliminacion: ${err}`));
        });
    });
}

// function actualizarRegistro(tabla, data, codigo) {
//     return new Promise ((resolve, reject) => {
//         conexion.query(`UPDATE ${tabla} SET ? WHERE ${codigo} = ?`, [data, eval(`data.${codigo}`)], (err, result) => {
//             return !err ? resolve(result) : reject(console.log('Algo salio mal al realizar la actualización: + data.${codigo} + ${err}'));
//         });
//     });
// }

function actualizarRegistro(tabla, data, codigo) {
    return new Promise((resolve, reject) =>{
        conexion.query(`UPDATE ${tabla} SET ? WHERE ${codigo} = ?`,[data, codigo] , (error,result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}



module.exports = {
    obtenerDatos,
    obtenerRegistro,
    agregarRegistro,
    eliminarRegistro,
    actualizarRegistro
}