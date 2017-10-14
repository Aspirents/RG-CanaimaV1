var mongoose = require("mongoose");

var Schema = mongoose.Schema;

	var ServicioModelo = new Schema({
		
			Id_Aula: { type: Schema.ObjectId, ref: 'aula'},
			Nombre: { type: String },
			Inst_procedencia: { type: String },
			Posee_Canaima: { type: Boolean},
			Id_Canaima: { type: String }

	});

var alumno = mongoose.model('alumno', ServicioModelo);

module.exports = alumno;

