const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/gastoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crear un gasto
//api/gastos

router.post('/',
auth,
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('presupuesto', 'El presupuesto es obligatorio').not().isEmpty()
],

gastoController.crearGasto
);


//Obtener los gastos por proyectos
router.get('/',
auth,
gastoController.obtenerGastos
);

//Actualizar gasto
router.put('/:id',
auth,
gastoController.actualizarGasto
);

//Eliminar gasto
router.delete('/:id',
auth,
gastoController.eliminarGasto
);

module.exports = router;