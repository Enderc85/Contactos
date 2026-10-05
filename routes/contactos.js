var express = require('express');
var router = express.Router();
var contactoController = require('../controllers/contactoController');
var { requireAuth } = require('../middlewares/authMiddleware');

// Lista de contactos en agenda (Accesible para ver la agenda)
router.get('/', contactoController.listarContactos);

// Crear nuevo contacto (Protegido por Autenticación)
router.get('/new', requireAuth, contactoController.formularioCrear);
router.post('/new', requireAuth, contactoController.crearContacto);

// Editar contacto (Protegido por Autenticación)
router.get('/:id/editar', requireAuth, contactoController.formularioEditar);
router.post('/:id/editar', requireAuth, contactoController.actualizarContacto);

// Vista detallada/tarjeta individual de contacto (Protegida por Autenticación)
router.get('/:id', requireAuth, contactoController.verContacto);

module.exports = router;
