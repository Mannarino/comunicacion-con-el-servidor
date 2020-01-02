
	var contenedor = document.getElementById('contenedor')
	var contenedorImagenes = document.getElementById('contenedor-imagenes')
	var botonFetch = document.getElementById('cargarWithFetch')
	var botonXMLHttpRequest = document.getElementById('cagarWithXMLHttpRequest')

	botonFetch.addEventListener('click', cargarWithFetch)
	botonXMLHttpRequest.addEventListener('click',cagarConObjetoXMLHttpRequest)
	
	
function cargarWithFetch(){
	fetch('https://randomuser.me/api/')
		.then(function(p){
				return p.json()
		})			
		.then(function(datos){
				contenedor.innerHTML= `
									<h3>Este usuario se cargo dinamicamente con datos de una api web</h3>
									<img src="${datos.results[0].picture.large}	">
									<p><b>nombre:</b>${datos.results[0].name.first}</p>
									<p><b>apellido:</b>${datos.results[0].name.last}</p>
									<p><b>sexo:</b>${datos.results[0].gender}</p>
									
									<p><b>direccion:</b>${datos.results[0].location.street.name} ${datos.results[0].location.street.number}</p>
									<p><b>email:</b>${datos.results[0].email}</p>
									<p><b>telefono:</b>${datos.results[0].phone}</p>
									<button type="button" class="btn btn-primary" onclick="cargarWithFetch()">Actualizar usuario</button>
									`	
				contenedorImagenes.innerHTML = '<img src="img/imagenCodigoFetch.jpg" >'
		})
}

function cagarConObjetoXMLHttpRequest(){
		var obj = new XMLHttpRequest();
			obj.open('GET','https://ghibliapi.herokuapp.com/films');
			obj.onreadystatechange = construirDom;
			obj.send();

		function construirDom(){
			if(obj.readyState===4 && obj.status===200){
				var respuesta = JSON.parse(obj.responseText)
				var templateEnding = ""
				respuesta.forEach(function(element){
					var elementoDescription = element.description.substring(0,100)
					var templateElemento = `
								  <div class="tarjeta">
								    <h5 class="card-title">${element.title}</h5>
								    <p class="card-text">${elementoDescription}</p> 
								  </div>
								`;
					templateEnding = templateEnding + templateElemento
				})
				contenedor.innerHTML = templateEnding
				contenedorImagenes.innerHTML = '<img src="img/imagenCodigoObjetoXMLHttpRequest.jpg" >'
			}
		}
}