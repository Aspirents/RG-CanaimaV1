var express = require('express');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var multer = require("multer");
var cookieSession = require("cookie-session");

mongoose.Promise = require('bluebird');
var servidor = express();
var mul = multer({ dest: 'Cliente/iproductos/' });
var mulu = multer({ dest: 'Cliente/iusuarios/' });



servidor.use(bodyParser.urlencoded({ extended: true }));
servidor.use(bodyParser.json({type: 'aplication/*+json' }));

//Configuracion de la session
servidor.use(cookieSession({
	name: "session",
	keys: ["llave-1", "llave-2"]

}));


var usuario = {
	id: {type: String},
	nombre: {type: String},
	cuenta: {type: String}
}
usuario.logeado=false;
usuario.tipo=false;





//Base de datos:

mongoose.connect('mongodb://localhost/RG-CanaimaV1', 

	function(err, res) {  
  
		  if(err) { console.log('ERROR: Conexion a Database. ' + err); }
		  
		  else{
		  		console.log('Conectado a base de datos inveniet');
						  }

											}
	);


//Modelos (Tablas):

	var servicio  = require('./Modelo/m-servicio');

//Controladores:

	var cServicio = require('./controlador/c-servicio');


//Vistas con Jade
	servidor.use(express.static("Cliente"));
	servidor.set("view engine","jade");



//Rutas:
	
/*
servidor.post("/producto", function(solicitud, resp){

	console.log(solicitud.body);

	if(solicitud.body.cmt){

		cComentario.AgregarComentario(solicitud.body); 

	}

	else{
		
	
		cPuntuacion.AgregarPuntuacion(solicitud.body);

	}

									
resp.redirect("/producto?id="+solicitud.body.pid);

});
*/



// Lanzador de pagina de SERVICIO

servidor.get("/servicio",function(solicitud,respuesta){

	respuesta.render("registro");
});






/* Lanzador de pagina ficha de producto
servidor.get("/producto", function(solicitud,respuesta){
	console.log(solicitud.query.id);

	var dp , dl;

	var nuevo = {
					ID_usuario: 	{ type: String },
		nombre_usuario:  { type: String },
		mensaje: 		{ type: String },
		fecha: 			{ type: Date },
		Id_local:	{ type: String }
			
			};

	var n=[];

	producto.find({_id: solicitud.query.id}, function(err, documentos){

		console.log(documentos.length);

		if(err) console.log(err);

		else{
			console.log(documentos[0]);
			dp = documentos[0];

			console.log('Este es el id del local: '+dp.id_local);

			local.find({_id: dp.id_local}, function(err, registro){
				console.log(registro.length);

				if(err) console.log(String(err));

				else{
					//console.log(registro[0]);
					dl = registro[0];


					comentario.find({Id_local: dl.id}, function(err,coment){
							if(err) console.log(String(err));
							else
							{

								var minute = 1000 * 60;
								var hour = minute * 60;
								var day = hour * 24;

								nuevo=coment;

								for(var i=0; i<coment.length;i++){
									console.log(" length vale: "+coment.length+"\n");
						
									

									console.log("\n Esto es n cuando i vale: ");
									console.log(nuevo);

									


								}
								console.log("\n Vengo a  mostrar q tiene n antes de salir del ciclo: \n");
									console.log("\n Esto es los dos comentrios de n: \n");
									console.log(nuevo);

									respuesta.render("producto2", {Usuario: usuario, dp: dp, dl: dl, coments: nuevo});
								
								//console.log(comt);
							}
						});

				} 

					
				
				});

		} 

		});

});


//var servicio = mongoose.model('Servicio', ServicioModelo);
*/

// Controlador Servicio
servidor.post("/servicio",function(solicitud, respuesta){
	console.log("\n este es el que recibi por post servicio: \n");
	console.log(solicitud.body);
	console.log("\n Esto es lo que guarde: \n");

	c-servicio.SalvarRegistro(solicitud, respuesta);


/*
	var nuevo = {

			Datos_Aula: {
				ND: solicitud.body.ND,
				NA: solicitud.body.NA,
				INS: solicitud.body.INS,
				G:   solicitud.body.G,
				SEC: solicitud.body.SEC,
				TIN: solicitud.body.TIN
			},

			Datos_Comp: {
				PC: solicitud.body.PC,
				MOD: solicitud.body.MOD,
				SER: solicitud.body.SER,
				SO: solicitud.body.SO,
				VSO: solicitud.body.VSO,
				NUSB: solicitud.body.NUSB,
				NR: solicitud.body.NR,
				NAUD: solicitud.body.NAUD,
				TPV: solicitud.body.TPV
			},

			Condiciones_PC: {
				CG: solicitud.body.CG,
				NAS: solicitud.body.NAS,
				TECL: solicitud.body.TECL,
				M: solicitud.body.M,
				PANT: solicitud.body.PANT,
				BATT: solicitud.body.BATT,
				CAM: solicitud.body.CAM,
				COR: solicitud.body.COR,
				EUSB: solicitud.body.EUSB,
				USBO: solicitud.body.USBO,
				EPV: solicitud.body.EPV,
				ER: solicitud.body.ER,
				EWF: solicitud.body.EWF,
				PCR: solicitud.body.PCR,
				HOT: solicitud.body.HOT,
				CULER: solicitud.body.CULER,
				DISR: solicitud.body.DISR,
				NMD: solicitud.body.NMD,
				UMD: solicitud.body.UMD,
				TD: solicitud.body.TD,
				UTD: solicitud.body.UTD,
				CC: solicitud.body.CC,
				OFF: solicitud.body.OFF,
				GAME: solicitud.body.GAME
			}
		}

	var x = new servicio(nuevo);

	console.log("Esto es lo que voy a guardar: \n"+x+"\n");


	x.save(function(err,x){
			if(err) return console.log(err);
			else {
				return console.log(x);
			}
		});


		respuesta.redirect("/servicio"); */
});






servidor.listen(8080, function(){
	 console.log("Servidor de NodeJs corriendo en http://localhost:8080");
});
