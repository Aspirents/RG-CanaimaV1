
var aula = require('../Modelo/m-aula');
var alumno = require('../Modelo/m-alumno');
var canaima = require('../Modelo/m-canaima');
var condicion = require('../Modelo/m-condicion');
var consulta = require('../Modelo/m-consulta');


var upperCase = require('upper-case')
 
module.exports.Buscar_codigo = function(cod, res)
{

	console.log("\nBuscando alumno por codigo de canaima/..\n");

	canaima.find({Serial: cod}, function(err, reg)
		{

			alumno.find({Id_Canaima: cod}, function(err, doc)
				{

					aula.find({_id: doc[0].Id_Aula}, function(err, salon)
						{

							condicion.find({Id_serial: cod}, function(err, con)
								{

									console.log("\n Estableciendo registros...\n");

									var registro = [{

										Nombre: doc[0].Nombre,
										Grado: salon[0].Grado,
										Seccion: salon[0].Seccion,
										codigo: reg[0].Serial,
										condicion: con[0].Condicion_gral
									}]

									console.log("\n Registro: "+registro);
									console.log("\n Enviando registros...\n");

									res.render("Buscador", {registros: registro, enc: true, texto: cod});


											});



									});


						});


		});


};


module.exports.Enviar_Destruir = function(grado, res){


	consulta.find({Grado: grado},
		function(err, reg)
			{

				var filtro = [];
				var registro = [];
				var cont = 0;
				var uniq = true;
				var a=0;
				var x=0;

				filtro = reg;
				//registro[a] = reg[0];
				a=1;

				console.log(" Registros encontrados: " + reg.length);


				for (var i = 0; i < filtro.length; i++) {

					for (var j = 0 ; j < reg.length; j++) {

						if(filtro[i] == reg [i])
						{
							//console.log("igual");
							cont = cont+1;
						}

						if(cont>0)
						{
							consulta.remove({codigo: filtro[i].codigo});
							cont=0;

						//	registro[a] = filtro[i];

							//console.log("borre");
						}
									
									}

					}

					}

					
		);

	consulta.find({Grado: grado},
		function(err, reg)
			{ 

			res.render("Buscador", { enc: true, registros: reg, texto: grado});
			});



};



module.exports.Enviar = function(grado, seccion, res){



	consulta.find({Grado: grado, Seccion: seccion},
		function(err, reg)
			{ 

			res.render("Buscador", { enc: true, registros: reg, texto: grado});
			});



};






module.exports.Consultas =  function()
{



		aula.find({}, function(err, salas)
		{

			salas.forEach(function(sala)
			{	

				alumno.find({Id_Aula: sala._id}, 
				function(err, docs)
				{

					docs.forEach(function(doc)
						{	
						

						condicion.find({Id_serial: doc.Id_Canaima},
							function(err, c)
								{
									var registro = {

										Nombre: doc.Nombre,
										Grado: sala.Grado,
										Seccion: sala.Seccion,
										codigo: doc.Id_Canaima,
										condicion: c[0].Condicion_gral

									}
									

									var nuevo = new consulta(registro);

									nuevo.save(function(err,x){
										if(err) return console.log("\nEste es el error "+err);
										
										else {
											//return console.log("\n Cargue: "+x);
														}
										});	

								});

								});

			});

		});


});
	}



module.exports.VerDatos = function(grado, sec, serial, res)
{

		aula.find({Grado:grado, Seccion: sec}, function(err, salas)
		{

			salas.forEach(function(sala)
			{	

				alumno.find({Id_Canaima: serial}, 
				function(err, docs)
				{

					docs.forEach(function(doc)
						{	
						

							canaima.find({Serial: serial},
								function(err, regs)
									{

										condicion.find({Id_serial: serial},
											function(err, c)
												{
													var DA = 
														{
															NombreD: sala.Nombre_Docente,
															NombreA: doc.Nombre,
															Inst_P: doc.Inst_procedencia,
															Grado: sala.Grado,
															Seccion: sala.Seccion
					
																	}
													//console.log(DA);

													var pc = 'SI';

													if(!doc.Posee_Canaima){
														pc = "NO";
													}


													var DE = 
														{

															PCanaima: pc,
															Serial: regs[0].Serial,
															SO: regs[0].SO,
															Version: regs[0].VersionSO,
															N_usb: regs[0].NP_usb,
															N_audio:  regs[0].NP_audio,
															N_lan: regs[0].NP_lan,
															T_Pvideo: regs[0].T_Pvideo

																	}
													//console.log(DE);


													res.render("Ficha_canaima", 
														{ 
															Alumno: doc.Nombre, grado:grado, 
															seccion: sec,
															Datos_Aula: DA,
															Datos_Equipo: DE,
															Cond: c[0]

															 });

												});

											});

								

							});

					});

			});


		});


}



Guardar_Aula = function(reg, Alum)
{

	aula.find({}, 
		function(err, docs){

			var enc = false;
			var cont = 0;

			docs.forEach( function(doc) {
				

				if(doc.Nombre_Docente == reg.ND)
					{
						// Tengo el aula registrada

							Guardar_Alumno(Alum, doc._id);

							alumno.find({Id_Canaima: reg.Id_Canaima},
								function(err, dats){

										doc.Alumno[docs.Alumno.length-1] = dats[0]._id;
									
										var nuevo = new aula(doc);

										nuevo.save(function(err,x){
											if(err) return console.log("\nEste es el error "+err);
																		
											else {
												return console.log("\n Cargue Aula: "+x);
																	}
																		});	


											});



								}
				if(cont == (docs.length-1) )
				{

					var nuevo = new aula(reg);

						nuevo.save(function(err,x){
							if(err){

								return console.log("\nEste es el error "+err);
								}										
							else {

					aula.find({Nombre_Docente: reg.Nombre_Docente}, function(err, dats)
						{
							console.log('\n encontre algo: '+dats[0]._id+'\n');
							Guardar_Alumno(Alum, dats[0]._id);


						});
								return console.log("\n Cargue Aula: "+x);
												}
									});	



				}



					cont = cont +1;
					});

		}


		);


}



Guardar_Alumno = function(reg, id)
{

		var nuevo = new alumno(reg);

		nuevo.Id_Aula = id;


		if( upperCase(reg.Posee_Canaima) == 'NO')
			{

			nuevo.Posee_Canaima = false;

			}
		else{
			nuevo.Posee_Canaima = true;
		}



console.log("guardare al alumno: \n"+ id+"\n");
console.log(nuevo);


		nuevo.save(function(err,x){
			if(err) return console.log("\nEste es el error "+err);
										
			else {
				return console.log("\n Cargue Alumno: "+x);
									}
										});	
}



Guardar_Canaima = function(reg)
{


	alumno.find({Id_Canaima: reg.Serial}, function(err, dat)
		{

			reg.Id_Alumno = dat._id;

				var nuevo = new canaima(reg);

				nuevo.save(function(err,x){
					if(err) return console.log("\nEste es el error "+err);
												
					else {
						return console.log("\n Cargue Canaima: "+x);
									}

						});	

		});


										

}


Guardar_Condicion = function(reg, serial)
{


	reg.Id_serial = serial;


		var nuevo = new condicion(reg);


		if(upperCase(reg.Cont) == 'NO')
			{

			nuevo.Cont_Canaima = false;

			}
		else{
			nuevo.Cont_Canaima = true;
		}

		if( upperCase(reg.L_OF) == 'NO')
			{

			nuevo.Libre_Office = false;

			}
		else{
			nuevo.Libre_Office= true;
		}

		if( upperCase(reg.GAME ) == 'NO')
			{

			nuevo.Juegos = false;

			}
		else{
			nuevo.Juegos  = true;
		}




		nuevo.save(function(err,x){
			if(err) return console.log("\nEste es el error "+err);
										
			else {
				return console.log("\n Cargue Condicion: "+x);
									}
										});	


}



module.exports.GuardarRegistro = function(datos,res)
	{


		console.log("esto es lo que recibi: \n"); console.log(datos);


		var alum = 
			{

			Id_Aula: '',
			Nombre: datos.Nombre,
			Inst_procedencia: datos.Inst_procedencia,
			Posee_Canaima: false,
			Id_Canaima: datos.Serial


			};


		Guardar_Aula (datos, alum);

		Guardar_Canaima (datos);

		Guardar_Condicion (datos, datos.Serial);

		


		res.redirect("/Registrar");

					}
		