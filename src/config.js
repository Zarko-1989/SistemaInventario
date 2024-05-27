require('dotenv').config();

module.exports = {

    // Creación del puerto para la conexión.
    app:{
        port: process.env.PORT || 4000,
    },

    mysql:{
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB || 'db_sistema_inventario',
    }
}