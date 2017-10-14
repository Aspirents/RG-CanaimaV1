var mongoose = require("mongoose");

var Schema = mongoose.Schema;

	var ServicioModelo = new Schema({
		
		Datos_Aula: {
			ND: { type: String}, 	// Nombre del docente
			NA: { type: String}, 	// Nombre del Alumno
			INS: { type: String},	// Insttitucion de Procedencia
			G: 	 { type: Number },	// Grado
			SEC: { type: String},	// Seccion
			TIN: { type: String} 	// Tipo de institucion
		},

		Datos_Comp: {
			PC: { type: String},
			MOD: { type: String},
			SER: { type: String},
			SO: { type: String},
			VSO: { type: String},
			NUSB: { type: String},
			NR: { type: String},
			NAUD: { type: String},
			TPV: { type: String}
		},

		Condiciones_PC: {
			CG: { type: String},
			NAS: { type: String},
			TECL: { type: String},
			M: { type: String},
			PANT: { type: String},
			BATT: { type: String},
			CAM: { type: String},
			COR: { type: String},
			EUSB: { type: String},
			USBO: { type: String},
			EPV: { type: String},
			ER: { type: String},
			EWF: { type: String},
			PCR: { type: String},
			HOT: { type: String},
			CULER: { type: String},
			DISR: { type: String},
			NMD: { type: Number },
			UMD: { type: String},
			TD: { type: Number },
			UTD: { type: String },
			CC: { type: String},
			OFF: { type: String},
			GAME: { type: String}
		}

	});

var servicio = mongoose.model('Servicio', ServicioModelo);

module.exports = servicio;
