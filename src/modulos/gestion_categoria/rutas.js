const express = require('express');
const respuesta = require('../../controladores/respuestas');

const controlador_db = require('./controlador_db');

const router = express.Router();

router.get('/', home);
router.get('/alterna', funcionAlterna);

router.get('/consultar', obtenerCategorias);
router.get('/consultar/:id', obtenerRegCategoria);
router.post('/crear', agregarRegCategoria);
router.delete('/eliminar/:id', eliminarRegCategoria);
router.put('/actualizar', actualiarRegCategoria);


async function home(req, res){
    //res.send('Llamado exitoso a la acción Home display: el servicio Gestion docente');
    try{
        respuesta.sucess(req, res, 'Llamado exitos a la acción Home del servicio Gestion_Categorias', 200);
    } catch(err) {
        respuesta.error(req, res, 'Error interno del servidor '+ err, 500);
    }

}

async function funcionAlterna(req,res) {
    //res.send('Llamado exitoso a la acción Alnterna del servicio gestion docente');

    try {
        respuesta.sucess(req, res, 'Llamado exitoso a la acción alterna de gestion categorias', 200);

    } catch(err) {
        respuesta.error(req, res, 'Error interno del servidor '+ err, 500);
    }
}

async function obtenerCategorias(req, res){
    try{
        const items = await controlador_db.obtenerCategorias();
            respuesta.sucess(req, res, items, 200);
        } catch(err){
            respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
        }
};

async function obtenerRegCategoria(req, res){
    try{
        const items = await controlador_db.obtenerRegCategoria(req.params.id);
            respuesta.sucess(req, res, items, 200);
        } catch(err){
            respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
        }
};

async function agregarRegCategoria(req, res){
    try{
        const items = await controlador_db.agregarRegCategoria(req.body);
        respuesta.sucess(req, res, 'Registro agregado con éxito', 201);
    } catch(err){
        respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
    }
};

async function eliminarRegCategoria(req, res){
    try{
        const items = await controlador_db.eliminarRegCategoria(req.params.id);
        respuesta.sucess(req, res, 'Registro eliminado con éxito', 200);
    } catch(err){
        respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
    }
};

async function actualiarRegCategoria(req, res){
    const existe = await controlador_db.obtenerRegDocente(req.body.cod_docente);

    if(existe == ''){
        respuesta.sucess(req, res, 'Registro no exite', 201);
    }else{
        try{
            const items = await controlador_db.actualiarRegCategoria(req.body);
            respuesta.sucess(req, res, 'Registro actualizado con éxito', 201);
        }catch(err){
            respuesta.error(req, res, 'Error interno del servidor: '+ err, 500);
        }
    }
};

module.exports = router;
