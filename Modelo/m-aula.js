var mongoose = require("mongoose");

var Schema = mongoose.Schema;

	var ServicioModelo = new Schema({
				
			Nombre_Docente: { type: String},
			Grado: 	 { type: Number },
			Seccion: { type: String},
			Canaimas_Windows: {type:Number},
			Canaimas_Operativas: {type:Number},
			Total_Canaimas: {type:Number},
			Alumnos: [ ]
	});

var aula = mongoose.model('aula', ServicioModelo);

module.exports = aula;

