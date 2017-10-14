var mongoose = require("mongoose");

var Schema = mongoose.Schema;

	var ServicioModelo = new Schema({
		
		Datos_Aula: {
			ID: {Type: String},
			ND: { type: String},
			G: 	 { type: Number },
			SEC: { type: String}
		}

	});

var servicio = mongoose.model('registro', ServicioModelo);

module.exports = registros;
