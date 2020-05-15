const express = require('express');
const router = express.Router();
const presupuestoController = require('../controllers/presupuestoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator')

//Crea presupuestos
//api/presupuestos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del presupuesto es obligatorio').not().isEmpty(),
        check('valor', 'El valor del presupuesto es obligatorio').not().isEmpty()
    ],
    presupuestoController.crearPresupuesto
);


//Obtener todos los presupuestos
router.get('/',
    auth,
    presupuestoController.obtenerPresupuestos
);


//Actulizar presupuestos via ID
router.put('/:id',
auth,
[
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    check('valor', 'El valor del presupuesto es obligatorio').not().isEmpty()
],
presupuestoController.actualizarPresupuesto

);


//Eliminar un presupuesto
router.delete('/:id',
auth,
presupuestoController.eliminarPresupuesto

);

module.exports = router;