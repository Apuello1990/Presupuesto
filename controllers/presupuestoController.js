const Presupuesto = require('../models/Presupuesto')
const {validationResult} = require('express-validator')

exports.crearPresupuesto = async(req, res) =>{

    //Reviar si hay errores
    const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }

    try {

        //Crear nuevo presupuesto
        const presupuesto = new Presupuesto(req.body);

        //Guardar el creador via JWT
        presupuesto.creador = req.usuario.id;

        //Guardamos el presupuesto
        presupuesto.save();
        res.json(presupuesto);

    } catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}


//Obtiene todos los presupuesto del usuario actual
exports.obtenerPresupuestos = async(req, res) =>{
    try {
        //Trae todo los presupuestos del creador y los ordena del mas reciente
        const presupuestos = await Presupuesto.find({creador: req.usuario.id}).sort({creado: -1});
        res.json({presupuestos})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//Actualiza un presupuesto
exports.actualizarPresupuesto = async (req, res) =>{
 
     //Reviar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }
    
     //extraer la informacion del presupuesto
     const {nombre, valor} = req.body;
     const nuevoPresupuesto = {};

     //Para cada campo que desees actualizar debes hacer un if
     if(nombre){
        nuevoPresupuesto.nombre = nombre;
     }
     if(valor){
        nuevoPresupuesto.valor = valor;
    }
     try {

        //Revisar el id
        let presupuesto = await Presupuesto.findById(req.params.id);

        //Si el proyecto existe o no
        if(!presupuesto){
            return res.status(404).json({msg:'Presupuesto no encontrado'})
        }

        //Verificar el creador del proyecto
        if(presupuesto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }

        //Actualizar 
        presupuesto = await Presupuesto.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoPresupuesto}, {new: true});
        res.json({presupuesto});

     } catch (error) {
         console.log(error);
         res.status(500).send('Error en el servidor');
         
     }

}

//Elimina un presupuesto por su ID
exports.eliminarPresupuesto = async(req, res) =>{

    try {

         //Revisar el id
         let presupuesto = await Presupuesto.findById(req.params.id);

         //Si el presupuesto existe o no
         if(!presupuesto){
             return res.status(404).json({msg:'Presupuesto no encontrado'})
         }
 
         //Verificar el creador del presupuesto
         if(presupuesto.creador.toString() !== req.usuario.id){
             return res.status(401).json({msg: 'No Autorizado'});
         }

         //Eliminar el Presupuesto
         await Presupuesto.findOneAndRemove({_id: req.params.id});
         res.json({msg:'Presupuesto eliminado'})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }

}

