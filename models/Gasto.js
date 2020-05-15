const mongoose = require('mongoose');

const GastoSchemma = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true

    },
    valor:{
        type: String,
        require: true,
        trim: true

    },
    creado:{
        type: Date,
        default: Date.now()


    },
    presupuesto:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Presupuesto'

    }
})

module.exports = mongoose.model('Gasto', GastoSchemma)