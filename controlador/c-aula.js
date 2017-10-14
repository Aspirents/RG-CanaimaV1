
var aula = require('../Modelo/m-aula');
var alumno = require('../Modelo/m-alumno');
var canaima = require('../Modelo/m-canaima');
var condicion = require('../Modelo/m-condicion');
var consulta = require('../Modelo/m-consulta');
 

module.exports.CargarAlumnos = function()
{

	try {

		var id1, id2, id3; var al = [];   var a=0;

			aula.find({}, function(err, doc)
				{
					for (var i = 0; i < doc.length; i++) {
						id = doc[i]._id;
						var b = new aula(doc[i]);

						//console.log("\n esto es doc: "+doc[i]);

					alumno.find({Id_Aula: id}, function(err, reg)
						{

							 //console.log("\nEste es el id1: "+id);


							 	for (var j = 0; j < reg.length; j++) {
							 	 
							 	 console.log(reg[j]._id);

							 		al[a]=reg[j]._id;
									a=a+1;

									//console.log("\nEsto es Al: "+al);


							 	}

							 	
							 	b.Alumnos =al;

							 	console.log("\n Estos es b: "+b);

							 	var r = new aula(b);

								r.save(function(err,x){
									if(err) return console.log("\nEste es el error "+err);
									
									else {
										return console.log("\n Guarde: "+x);
													}
										});	


								});


						}// fIN PARA

			});



	} catch(e) {



		console.log(e);
	}

	};


module.exports.MostrarAulas = function(req, res)
{


	console.log("\n Bucando aulas...");

	aula.find({}, function(err, reg)
		{

			var enc = false;

			console.log("\n Aulas encontradas: "+reg.length+"\n");



			if (reg.length > 1) 
			{
				enc = true;
				var A = [];

				for (var i = 0; i < reg.length; i++) {
				 	

					A[i] = reg[i];


				}

				res.render("Aulas", {aulas: A,encontrado: enc});



			}

			else
			{
				res.render("Aulas", {encontrado: false});
			}






		});

}


module.exports.Enviar = function(grado, sec, res){



	consulta.find({Grado: grado, Seccion: sec},
		function(err, docs)
			{ 

				var reg = []; var text; var a= 0;

					docs.forEach(function(doc, reg)
						{	
							if (doc.seccion == sec)
							 	{
							 		reg[a] = doc;
							 		a = a+1;
							 	}


								});

					text = grado+' '+sec;
					console.log(docs);

			res.render("Buscador", { enc: true, registros: docs, texto: text});
			});



};