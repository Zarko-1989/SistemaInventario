const express = require('express');
const respuesta = require('../../controladores/respuestas');

const controlador_db = require('./controlador_db');

const router = express.Router();

router.get('/', home);
router.get('/alterna', funcionAlterna);

router.get('/consultar', obtenerVentas);
router.get('/consultar/:id', agregarRegVenta);
router.post('/crear', agregarRegVenta);
router.delete('/eliminar/:id', eliminarRegVenta);
router.put('/actualizar', actualizarRegVenta);


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

async function obtenerVentas(req, res){
    try{
        const items = await controlador_db.obtenerVentas();
            respuesta.sucess(req, res, items, 200);
        } catch(err){
            respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
        }
};

async function agregarRegVenta(req, res){
    try{
        const items = await controlador_db.agregarRegVenta(req.params.id);
            respuesta.sucess(req, res, items, 200);
        } catch(err){
            respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
        }
};

async function agregarRegVenta(req, res){
    try{
        const items = await controlador_db.agregarRegVenta(req.body);
        respuesta.sucess(req, res, 'Registro agregado con éxito', 201);
    } catch(err){
        respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
    }
};

async function eliminarRegVenta(req, res){
    try{
        const items = await controlador_db.eliminarRegVenta(req.params.id);
        respuesta.sucess(req, res, 'Registro eliminado con éxito', 200);
    } catch(err){
        respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
    }
};

async function actualizarRegVenta(req, res){
    const existe = await controlador_db.obtenerRegDocente(req.body.cod_docente);

    if(existe == ''){
        respuesta.sucess(req, res, 'Registro no exite', 201);
    }else{
        try{
            const items = await controlador_db.actualizarRegVenta(req.body);
            respuesta.sucess(req, res, 'Registro actualizado con éxito', 201);
        }catch(err){
            respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
        }
    }
};

module.exports = router;
