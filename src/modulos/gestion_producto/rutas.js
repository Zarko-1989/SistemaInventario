const express = require('express');
const respuesta = require('../../controladores/respuestas');

const controlador_db = require('./controlador_db');

const router = express.Router();

router.get('/', home);
router.get('/alterna', funcionAlterna);

router.get('/consultar', obtenerProductos);
router.get('/consultar/:id', obtenerRegProducto);
router.post('/crear', agregarRegProducto);
router.delete('/eliminar/:id', eliminarRegProducto);
router.put('/actualizar', actualizarRegProducto);


async function home(req, res){
    //res.send('Llamado exitoso a la acción Home display: el servicio Gestion docente');
    try{
        respuesta.sucess(req, res, 'Llamado exitos a la acción Home del servicio Gestion_Producto', 200);
    } catch(err) {
        respuesta.error(req, res, 'Error interno del servidor '+ err, 500);
    }

}

async function funcionAlterna(req,res) {
    //res.send('Llamado exitoso a la acción Alnterna del servicio gestion docente');

    try {
        respuesta.sucess(req, res, 'Llamado exitoso a la acción alterna de gestion producto', 200);

    } catch(err) {
        respuesta.error(req, res, 'Error interno del servidor '+ err, 500);
    }
}

async function obtenerProductos(req, res){
    try{
        const items = await controlador_db.obtenerProductos();
            respuesta.sucess(req, res, items, 200);
        } catch(err){
            respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
        }
};

async function obtenerRegProducto(req, res){
    try{
        const items = await controlador_db.obtenerRegProducto(req.params.id);
            respuesta.sucess(req, res, items, 200);
        } catch(err){
            respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
        }
};

async function agregarRegProducto(req, res){
    try{
        const items = await controlador_db.agregarRegProducto(req.body);
        respuesta.sucess(req, res, 'Registro agregado con éxito', 201);
    } catch(err){
        respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
    }
};

async function eliminarRegProducto(req, res){
    try{
        const items = await controlador_db.eliminarRegProducto(req.params.id);
        respuesta.sucess(req, res, 'Registro eliminado con éxito', 200);
    } catch(err){
        respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
    }
};

async function actualizarRegProducto(req, res){
    const existe = await controlador_db.obtenerRegDocente(req.body.cod_docente);

    if(existe == ''){
        respuesta.sucess(req, res, 'Registro no exite', 201);
    }else{
        try{
            const items = await controlador_db.actualizarRegProducto(req.body);
            respuesta.sucess(req, res, 'Registro actualizado con éxito', 201);
        }catch(err){
            respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
        }
    }
};

module.exports = router;
