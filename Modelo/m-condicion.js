var mongoose = require("mongoose");

var Schema = mongoose.Schema;

	var ServicioModelo = new Schema({

			Id_serial: { type: String },
			Condicion_gral: { type: String},
			Nivel_aseo: { type: String},
			Teclado: { type: Boolean },
			Mouse: { type: Boolean },
			Est_pantalla: { type: String},
			Est_bateria: { type: String},
			Est_camara: { type: String},
			Est_cornetas: { type: String},
			Est_P_USB: { type: String},
			USB_Op: { type: String},
			Est_Pvideo: { type: String},
			Est_Red: { type: String},
			Est_Wifi: { type: String},
			Ruido_Enc: { type: String},
			A_caliente: { type: String},
			R_culer: { type: String},
			R_disc: { type: String},

			Memoria_disp: { type: String },
			Tam_disc: { type: String },

			Cont_Canaima: { type: Boolean },
			Libre_Office: { type: Boolean },
			Juegos: { type: Boolean }
		
		});

var condicion = mongoose.model('condicion', ServicioModelo);

module.exports = condicion;
