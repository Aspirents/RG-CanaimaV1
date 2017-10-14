
// Modulos:


	// Servidor:
		var express = require('express');
		var bodyParser = require("body-parser");
		var methodOverride = require("method-override");

		var servidor = express();
		servidor.use(bodyParser.urlencoded({ extended: true }));
		servidor.use(bodyParser.json({type: 'aplication/*+json' }));

	// Base de Datos:
		var mongoose = require("mongoose");
		mongoose.Promise = require('bluebird');

		mongoose.connect('mongodb://localhost/RG-CanaimaV1', 

				function(err, res) {  
			  
					  if(err) { console.log('ERROR: Conexion a Database. ' + err); }
					  
					  else{
					  		console.log('Conectado a base de datos RG-CanaimaV1');
									  }

														}
				);

		//Modelos (Tablas):

			var servicio  = require('./Modelo/m-servicio');

		//Controladores:

			var cservicio = require('./controlador/c-servicio');
			var caula = require('./controlador/c-aula');
			var calumno = require('./controlador/c-alumno');

	//Vistas con Jade
		servidor.use(express.static("Cliente"));
		servidor.set("view engine","jade");



var iniciado= false;


// Lanzador de pagina de SERVICIO

servidor.get("/login",function(solicitud,respuesta){

	respuesta.render("login");
});


servidor.get("/",function(solicitud,respuesta){


//if(iniciado){

	caula.CargarAlumnos();
	calumno.Consultas();

	iniciado = true;
//}


	respuesta.render("canaima");
});



servidor.get("/Registrar",function(solicitud,respuesta){

	respuesta.render("Registro");
});


servidor.get("/Ficha",function(solicitud,respuesta){

	calumno.VerDatos(solicitud.query.grado, solicitud.query.seccion, solicitud.query.serial, respuesta );

	console.log(solicitud.query);


	//respuesta.render("Ficha_canaima");
});



servidor.get("/Aulas",function(solicitud,respuesta){

	caula.MostrarAulas(solicitud,respuesta);
});

servidor.get("/Buscar",function(solicitud,respuesta){


console.log("\nEsto es lo que llego: ");
console.log(solicitud.query);


	if(solicitud.query.serial)
	{
		 var cod = solicitud.query.serial;
		console.log("\nBuscando codigo...\n");
		
		calumno.Buscar_codigo(cod, respuesta);

		}


	else
	{


		switch (solicitud.query.optradio) {

		case "codigo":
			
			calumno.Buscar_codigo(solicitud.query.buscar, respuesta, 0);

			break;

		case "grado":
			calumno.Enviar_Destruir(solicitud.query.buscar, respuesta);
			break;

		default:
			
			if(  (solicitud.query.grado)&&(solicitud.query.seccion)  ){
				caula.Enviar(solicitud.query.grado, solicitud.query.seccion, respuesta );
			}

			else
			{
				respuesta.write("Error 404, direccion no encontrada...");
			}

			break;
			
			}
	}




	//respuesta.render("Buscador");
});




servidor.post("/Registrar",function(solicitud, respuesta){
	
	console.log("\n este es el que recibi por post Registrar \n");

	calumno.GuardarRegistro(solicitud.body, respuesta);
});

/*
servidor.post("/servicio",function(solicitud, respuesta){
	console.log("\n este es el que recibi por post servicio: \n");
	console.log(solicitud.body);
	console.log("\n Esto es lo que guarde: \n");

	//cservicio.SalvarRegistro(solicitud, respuesta);
});


*/

servidor.listen(4000, function(){
	 console.log("Servidor de NodeJs corriendo en http://localhost:4000");
});
