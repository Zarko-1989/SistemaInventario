const express = require('express');
const respuesta = require('../../controladores/respuestas');

const controlador_db = require('./controlador_db');

const router = express.Router();

router.get('/', home);
router.get('/alterna', funcionAlterna);

router.get('/consultar', obtenerClientes);
router.get('/consultar/:id', obtenerRegClientes);
router.post('/crear', agregarRegCliente);
router.delete('/eliminar/:id', eliminarRegCliente);
router.put('/actualizar', actualizarRegCliente);


async function home(req, res){
    //res.send('Llamado exitoso a la acción Home display: el servicio Gestion docente');
    try{
        respuesta.sucess(req, res, 'Llamado exitos a la acción Home del servicio Gestion_Cliente', 200);
    } catch(err) {
        respuesta.error(req, res, 'Error interno del servidor '+ err, 500);
    }

}

async function funcionAlterna(req,res) {
    //res.send('Llamado exitoso a la acción Alnterna del servicio gestion docente');

    try {
        respuesta.sucess(req, res, 'Llamado exitoso a la acción alterna de gestion Cliente', 200);

    } catch(err) {
        respuesta.error(req, res, 'Error interno del servidor '+ err, 500);
    }
}

async function obtenerClientes(req, res){
    try{
        const items = await controlador_db.obtenerClientes();
            respuesta.sucess(req, res, items, 200);
        } catch(err){
            respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
        }
};

async function obtenerRegClientes(req, res){
    try{
        const items = await controlador_db.obtenerRegClientes(req.params.id);
            respuesta.sucess(req, res, items, 200);
        } catch(err){
            respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
        }
};

async function agregarRegCliente(req, res){
    try{
        const items = await controlador_db.agregarRegCliente(req.body);
        respuesta.sucess(req, res, 'Registro agregado con éxito', 201);
    } catch(err){
        respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
    }
};

async function eliminarRegCliente(req, res){
    try{
        const items = await controlador_db.eliminarRegCliente(req.params.id);
        respuesta.sucess(req, res, 'Registro eliminado con éxito', 200);
    } catch(err){
        respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
    }
};

async function actualizarRegCliente(req, res){
    const existe = await controlador_db.obtenerRegDocente(req.body.cod_docente);

    if(existe == ''){
        respuesta.sucess(req, res, 'Registro no exite', 201);
    }else{
        try{
            const items = await controlador_db.actualizarRegCliente(req.body);
            respuesta.sucess(req, res, 'Registro actualizado con éxito', 201);
        }catch(err){
            respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
        }
    }
};

module.exports = router;
