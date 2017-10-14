var mongoose = require("mongoose");

var Schema = mongoose.Schema;

	var ServicioModelo = new Schema({

			Nombre: { type: String },
			Grado: { type: String},
			Seccion: { type: String},
			codigo: { type: String, unique: true},
			condicion: { type: String}

	});

var consulta = mongoose.model('consulta', ServicioModelo);

module.exports = consulta;

