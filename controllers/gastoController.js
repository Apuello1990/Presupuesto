const Gasto = require('../models/Gasto');
const Presupuesto = require('../models/Presupuesto');
const {validationResult} = require('express-validator');


//Crea un nuevo gasto
exports.crearGasto = async(req, res) =>{
    

     //Reviar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }

     

     try {

        //Extraer el presupuesto y comprobar si existe

        const {presupuesto} = req.body;

         const existePresupuesto = await Presupuesto.findById(presupuesto);
         if(!existePresupuesto){
             return res.status(404).json({msg:'Presupuesto no encontrado'})
         }

         //Revisar si el proyecto actual pertenece al usuario autenticado
         if(existePresupuesto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }

        //Creamos el gasto
        const gasto = new Gasto (req.body);
        await gasto.save();
        res.json({gasto});


     } catch (error) {
         console.log(error);
         res.status(500).send('Hubo un error')
     }

}

//Obtiene los gasto por presupuesto
exports.obtenerGastos = async(req, res) =>{

    try {

         //Extraer el presupuesto y comprobar si existe

         const {presupuesto} = req.query;

         const existePresupuesto = await Presupuesto.findById(presupuesto);
         if(!existePresupuesto){
             return res.status(404).json({msg:'Presupuesto no encontrado'})
         }

         //Revisar si el presupuesto actual pertenece al usuario autenticado
         if(existePresupuesto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }

        //Obtener los gastos por presupuesto
       const gastos = await Gasto.find({presupuesto}).sort({creado: -1});
      
       res.json({gastos})
       
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
        
    }
}

//Actualizar un gasto
exports.actualizarGasto = async(req, res) =>{
    try {
        
        //Extraer el presupuesto y comprobar si existe

        const {presupuesto, nombre, valor} = req.body;

        //Si el gasto existe o no
        let gastoExiste = await Gasto.findById(req.params.id);
      
        if(!gastoExiste){
            return res.status(404).json({msg:"No existe este gasto"});
        }

        //Extraer presupuesto
        const existePresupuesto = await Presupuesto.findById(presupuesto);
    

        //Revisar si el presupuesto actual pertenece al usuario autenticado
        if(existePresupuesto.creador.toString() !== req.usuario.id){
           return res.status(401).json({msg: 'No Autorizado'});
       }
       
       //Crear un objeto con la nueva informacion
       const nuevoGasto= {};
          nuevoGasto.nombre = nombre;
          nuevoGasto.valor= valor;
          
        

        //Guardar el gasto
        gasto = await Gasto.findOneAndUpdate({_id: req.params.id}, nuevoGasto, {new: true});
        res.json({gasto})

    } catch (error) {
        console.log(error).send('Hubo un error');
        
    }

}

exports.eliminarGasto = async(req, res)=>
{
  try {
      
    //Extraer el presupuesto y comprobar si existe

    const {presupuesto} = req.query;

    //Si el gasto existe o no
    let gastoExiste = await Gasto.findById(req.params.id);
  
    if(!gastoExiste){
        return res.status(404).json({msg:"No existe este gasto"});
    }

    //Extraer presupuesto
    const existePresupuesto = await Presupuesto.findById(presupuesto);


    //Revisar si el presupuesto actual pertenece al usuario autenticado
    if(existePresupuesto.creador.toString() !== req.usuario.id){
       return res.status(401).json({msg: 'No Autorizado'});
   }

   //Eliminar
   await Gasto.findOneAndRemove({_id: req.params.id});
  
  res.json({msg:'Gasto eliminado'})
  
   // res.json({msg: 'Gasto Eliminado'})

  } catch (error) {
     console.log(error);
     res.status(500).send('Hubo un error');
  }
}