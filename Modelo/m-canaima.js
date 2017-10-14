var mongoose = require("mongoose");

var Schema = mongoose.Schema;

	var ServicioModelo = new Schema({

			Serial: { type: String},
			Id_Alumno: { type: Schema.ObjectId, ref: 'alumno'},
			SO: { type: String },
			VersionSO: { type: String },
			NP_usb: { type: String },
			NP_audio: { type: String },
			NP_lan: { type: String },
			T_Pvideo: { type: String }
			

		});

var canaima = mongoose.model('canaima', ServicioModelo);

module.exports = canaima;

