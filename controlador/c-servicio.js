var servicio = require('../Modelo/m-servicio');
var aula = require('../Modelo/m-aula');
var alumno = require('../Modelo/m-alumno');
var canaima = require('../Modelo/m-canaima');
var condicion = require('../Modelo/m-condicion');



module.exports.SalvarRegistro = function(solicitud, respuesta)
	{

		console.log("\n este es el que recibi por post servicio: \n");
			console.log(solicitud.body);
			console.log("\n Esto es lo que guarde: \n");

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


				respuesta.redirect("/servicio");
						};

//Modificar
/*
module.exports.VerRegistro = function(req, res)
	{
		try 
            {
                producto.find({}, function(err, documentos){

                    console.log("\nCantidad de Registros: "+documentos.length+"\n");
                    
                    var j=0;
                    var productos=[];

                    for(var i=0; i<documentos.length;i++)
                        {
                        
                            if(err)  console.log(err);
                            
                            else 
                                {

                                    console.log(j+": "+documentos[i].nombre+'\n'+documentos[i].id+"\n");
                                    
                                    if(((documentos[i].nombre).toUpperCase()).indexOf((req.query.texto).toUpperCase())!=-1)
                                        {
                                            productos[j] = documentos[i];
                                            j++;
                                                        }
                                
                                                }

                                        }

                    console.log(productos);

                    if (productos.length < 1) {console.log("\n no encontre nada\n");res.render("busp", {Usuario: usuario, Texto: texto, encontrado: false});}

                    else
                        {

                            res.render("busp", {products: productos, Usuario: usuario, Texto: texto, encontrado: true});
                                }

                                });
                                
                            } 

        catch(e) {
            console.log("\n no encontre nada\n");
            res.render("busp", {Usuario: usuario, Texto: texto, encontrado: false});
            console.log(String(e));
        }
				};
				*/



module.exports.ExportarAula = function(req, res)
	{

		console.log("\nBuscando las Aulas y sus docentes");

		try {
			
			servicio.find({}, function(err, documento)
			{
				console.log("\ncantidad de registros: "+documento.length);

				var e, c, m;

				e=true;
				c=true;
				m=true;


				for( var i=0; i<documento.length; i++)
					{

						var buscador = documento[i].Datos_Aula;

						var busN = (buscador.ND).toUpperCase();


						switch (busN) {
									
									case "EDGLYS RODRIGUEZ":
										console.log("\n Edglys \n");
										if (e) {

											// Asignacion de datos del docentes:
											var enc = documento[i].Datos_Aula;
											// Preparar para guardar 

											var nuevo = {			
															
												Nombre_Docente: (enc.ND).toUpperCase(),
												Grado: 	enc.G,
												Seccion: (enc.SEC).toUpperCase(),
												Canaimas_Windows: 1,
												Canaimas_Operativas: 20,
												Total_Canaimas: 21
												}



											var registro = new aula(nuevo);
							
												registro.save(function(err,x){
														if(err) return console.log(err);
														else {
															return console.log("\n Guarde: "+registro);
														}
													});
												e = false;
											}

										break;


									case "CECILIA MARCANO":
										console.log("\n Cecilia \n");
										if (c) {

											// Asignacion de datos del docentes:
											var enc = documento[i].Datos_Aula;
											// Preparar para guardar 

											var nuevo = {			
															
												Nombre_Docente: (enc.ND).toUpperCase(),
												Grado: 	enc.G,
												Seccion: (enc.SEC).toUpperCase(),
												Canaimas_Windows: 1,
												Canaimas_Operativas: 20,
												Total_Canaimas: 21
												}



											var registro = new aula(nuevo);
							
												registro.save(function(err,x){
														if(err) return console.log(err);
														else {
															return console.log("\n Guarde: "+registro);
														}
													});
												c=false;
											}

										break;




									case "MARIA ":
										console.log("\n Maria \n");
										if(m) {

											// Asignacion de datos del docentes:
											var enc = documento[i].Datos_Aula;
											// Preparar para guardar 

											var nuevo = {			
															
												Nombre_Docente: "MARIA ALVAREZ",
												Grado: 	enc.G,
												Seccion: (enc.SEC).toUpperCase(),
												Canaimas_Windows: 1,
												Canaimas_Operativas: 20,
												Total_Canaimas: 21
												}



											var registro = new aula(nuevo);
							
												registro.save(function(err,x){
														if(err) return console.log(err);
														else {
															return console.log("\n Guarde: "+registro);
														}
													});

												m=false;
											}

										break;


									default:
										console.log("\nigual\n");
										break;
								} //fin caso

						}// fin for


					} ); //fin buscar


		 } catch(e) {
			// statements
			console.log(e);
		}

	};



module.exports.ExportarAlumnos = function(req, res)
	{

		console.log("\nBuscando Aula\n");

		try {
			

			aula.find({},function(err,salon)
				{

					servicio.find({}, function(err, reg)
						{
							for(var i=0; i<salon.length;i++)
								{

									for (var j = 0; j < reg.length; j++) {
										
											var al = reg[j].Datos_Aula;
											var dcomp = reg[j].Datos_Comp;
											var pc = true;

											if( ( (salon[i].Nombre_Docente)==((al.ND).toUpperCase()) )||(("MARIA ")==((al.ND).toUpperCase())) )
											{

												if ( ('NO')==((dcomp.PC).toUpperCase()) ) {
													pc = false;
												}

												var nuevo = {
													Id_Aula: salon[i]._id,
													Nombre: (al.NA).toUpperCase(),
													Inst_procedencia: (al.INS).toUpperCase(),
													Posee_Canaima: pc,
													Id_Canaima: dcomp.SER
												}


												var registro = new alumno(nuevo);
							
												registro.save(function(err,x){
														if(err) return console.log(err);
														else {
															return console.log("\n Guarde: "+registro);
														}
													});

											}


									}
											}
						});



				});



		} catch(e) {
			// statements
			console.log(e);
		}

	};


module.exports.ExportarCanaima = function(req, res)
	{


		console.log("Buscando Canaimas...\n");

		try {
			

			alumno.find({}, function(err, documento)
				{
					servicio.find({}, function(err, doc)
						{

						for (var i = 0; i < documento.length; i++) {

						console.log(documento[i].Id_Canaima);

						var id = documento[i].Id_Canaima;
						var id2 = documento[i]._id;
						var serial = 0;
						var dc;

							console.log("\n servicio:  "+id);

							for (var j = 0; j <doc.length; j++) {
								
								serial = doc[j].Datos_Comp.SER;

								if((serial)==(id))
								{
									
									dc =  doc[j].Datos_Comp;

											}





							}
								var nuevo ={

									Serial: id,
									Id_Alumno: id2,
									SO: dc.SO,
									VersionSO: dc.VSO,
									NP_usb: dc.NUSB,
									NP_audio: dc.NAUD,
									NP_lan: dc.NR,
									T_Pvideo: dc.TPV
								}

								var registro = new canaima(nuevo);
							
								registro.save(function(err,x){
									if(err) return console.log(err);
									else {
										return console.log("\n Guarde: "+registro);
										}
											});
							

					}

						});
					}
				);


		} catch(e) {
			// statements
			console.log(e);
		}

	};





Buscar = function(reg){


	console.log("\n Estos son los registros: "+reg);





};



module.exports.ExportarCondicion = function(req, res)
	{

		console.log("Buscando Canaimas...\n");

		

		try {
			
			var reg = [];

			canaima.find({}, function(err, documento)
				{
					servicio.find({}, function(err, doc)
						{

						for (var i = 0; i < documento.length; i++) {

							var id = documento[i].Serial;


							var serial = 0;
							var dc;


								for (var j = 0; j <doc.length; j++) {
									
									serial = doc[j].Datos_Comp.SER;

									if((serial)==(id))
									{
										
										dc =  doc[j].Condiciones_PC;

												}

												}

								var t = true;
								var m = true;
								var c = true;
								var o = true;
								var g = true;


								if ( ((dc.TECL).toUpperCase())==('NO') ){
									t=false;
								} 

								if ( ( ((dc.CC).toUpperCase())==('NO') ) ){
									c=false;
								} 

								if ( ( ((dc.OFF).toUpperCase())==('NO') ) ){
									o=false;
								} 

								if ( ( ((dc.GAME).toUpperCase())==('NO') ) ){
									g=false;
								} 


								if ( ((dc.M).toUpperCase())==('NO') ){
									m=false;
								} 	

								var nuevo ={

										Id_serial: id,
										Condicion_gral: ((dc.CG).toUpperCase()),
										Nivel_aseo: ((dc.NAS).toUpperCase()),
										Teclado: t,
										Mouse: m,
										Est_pantalla: ((dc.PANT).toUpperCase()),
										Est_bateria: ((dc.BATT).toUpperCase()),
										Est_camara: ((dc.CAM).toUpperCase()),
										Est_cornetas: ((dc.COR).toUpperCase()),
										Est_P_USB: ((dc.EUSB).toUpperCase()),
										USB_Op: ((dc.USBO).toUpperCase()),
										Est_Pvideo: ((dc.EPV).toUpperCase()),
										Est_Red: ((dc.ER).toUpperCase()),
										Est_Wifi: ((dc.EWF).toUpperCase()),
										Ruido_Enc: ((dc.PCR).toUpperCase()),
										A_caliente: ((dc.HOT).toUpperCase()),
										R_culer: ((dc.CULER).toUpperCase()),
										R_disc: ((dc.DISR).toUpperCase()),
										Memoria_disp: (dc.NMD)+((dc.UMD).toUpperCase()),
										Tam_disc: (dc.TD)+((dc.UTD).toUpperCase()),
										Cont_Canaima: c,
										Libre_Office: o,
										Juegos: g

									}

									//console.log(nuevo);


										var r = new condicion(nuevo);
									
	r.save(function(err,x){
		if(err) return console.log("\nEste es el error "+err);
		
		else {
			return console.log("\n Guarde: "+x);
						}
			});		
									//console.log(reg);

								}
						});
					});

			Buscar(reg);



		} catch(e) {
			// statements
			console.log(e);
		}






	};



