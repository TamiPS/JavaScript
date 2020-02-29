var select = document.getElementById("cuadroLista");
var paginacion = document.getElementById("paginacion");
var boton = document.getElementById("botonBuscar");
var raza = document.getElementById("raza");
var razaId = document.getElementById("razaId");
var autocomplitList = document.getElementById("autocomplete-items");
var paginaActual = 0;
var numPaginas;

/*
Cuando se abre la página se llama a la función obtener fotos, 
sin categoría y en página 0 por defecto 
*/
obtenerFotos();

/*
Cuando se selecciona en el "cuadrolista" una categoría, 
se vuelve a la página inicial
y se llama a la función 
"ObtenerFotos" 
*/
boton.addEventListener("click", function () {
    paginaActual = 0;
    if(raza.value == ''){
        razaId.value = '';
    }
    obtenerFotos();
});

/*
Input que llama a obtener razas y le pasa su value
*/
raza.addEventListener("input", function () {
    obtenerRazas(this.value);
});

/*
Llama a la función obtener respuesta y le pasa los dos parámetros 
(caso resolve y caso reject)
y la API de las categorías
*/
obtenerRespuesta(
    "https://my-json-server.typicode.com/TamaPS/categorias/categorias"
).then(manejarRespuestaCategories, manejarError);

/*
Función que recibe la url de la API de categorías.
Devuelve una promesa, que redirige a 
"manejarRespuestaCategories" o "manejarError"
setRequestHeader es la clave que solicita la API
*/
function obtenerRespuesta(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
       
        xhr.responseType = "json";
        xhr.setRequestHeader("x-api-key", "28b67f5f-39c3-449c-8a90-0c9dd8c36bf4");
        xhr.onload = function () {
            if (xhr.status == 200) {
                if (xhr.getResponseHeader("Pagination-Count")) {
                    var respuesta = [
                        xhr.getResponseHeader("Pagination-Count"),
                        xhr.response
                    ];
                } else {
                    var respuesta = [xhr.response];
                }
                resolve(respuesta);
            } else {
                reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = function () {
            reject(Error("******Network Error*****"));
        };
        xhr.send();
    });
}

/*
Función para cargar las fotos de una determinada categoría
*/
function obtenerFotos() {
    obtenerRespuesta(`https://api.thecatapi.com/v1/images/search?page=${paginaActual} &limit=6&order=asc&size=small&category_ids=${select.value}&breed_ids=${razaId.value}`).then(manejarRespuestaImages, manejarError);
}

/*
Llama a obtener razas y le pasa lo que hay en el input
después de 'q' aparecen las razas que contienen la cadena del search (del input)
*/
function obtenerRazas(search) {
    if (!search == "") {
        obtenerRespuesta("https://api.thecatapi.com/v1/breeds/search?q=" + search).then(
            manejarRespuestaRazas, 
            manejarError);
    } else autocomplitList.innerHTML = "";
}

/*
Función para recoger la categoría en el select
por defecto es none
*/
function manejarRespuestaCategories(respuesta) {
    resCategorias = respuesta[0];
    
    var categorias = '<option value="">none</option>';
    for (var i = 0; i < resCategorias.length; i++) {
        categorias +=
            '<option value="' +
            resCategorias[i].id +
            '">' +
            resCategorias[i].name +
            "</option>";
    }
    document.getElementById("cuadroLista").innerHTML = categorias;
}

/*
Lista las razas que coinciden con el contenido de "obtenerRazas" y 
lo va añadiendo a un div
*/
function manejarRespuestaRazas(listaRazas) {
    razaId.value = '';
    autocomplitList.innerHTML = "";
    for (var i = 0; i < listaRazas[0].length; i++) {
        b = document.createElement("DIV");
        b.setAttribute("onclick", "ponerIdName('" + listaRazas[0][i].id + "','" + listaRazas[0][i].name + "')");
        b.innerHTML = listaRazas[0][i].name;
        autocomplitList.appendChild(b);
    }
}

function ponerIdName(id, name) {
    razaId.value = id;
    raza.value = name;
    autocomplitList.innerHTML = "";
}

/*
Función para cambiar de página
y obtener fotos de dicha página
Recibe la página que se quiere mostrar
*/
function cambiarPagina(numPagina) {
    paginaActual = numPagina;
    obtenerFotos();
}

/*
Función para recoger las imágenes
1º Recoge la imágenes que hay en cada categoría
2º Define el número de páginas por categoría = 6 imágenes por x páginas
3º Carga las imágenes en un contenedor row del html
*/
function manejarRespuestaImages(respuesta) {
    numTotalImages = respuesta[0];
    console.log(respuesta);
    console.log("imagenes "+numTotalImages);

    numPaginas = numTotalImages / 6;
    resImages = respuesta[1];
    var fotos = "";
    for (var i = 0; i < resImages.length; i++) {
        fotos +='<div class="col-12 col-md-6 col-xl-4"><div class="card square  text-center"><img class="card-img-top" width="200" src="' + resImages[i].url + '" alt="' + resImages[i].id + '"></div></div>';
    }
    document.getElementsByClassName("row")[0].innerHTML = fotos;
    /*
      SECCIÓN PARA CREAR LA PAGINACIÓN
      */
    var a = document.createElement("a");
    a.href = "#";
    a.className = "page-link";
    a.text = "";

    var li = document.createElement("li");
    li.className = "page-item";

    paginacion.innerHTML = "";

    /*
      Las páginas avanzan y retroceden de 3 en 3
      */
    paginaInicial = paginaActual - 3;

    /*
      Defina la página inicial como página 0 si
      al restarle 3 es menor a 0
      */
    if (paginaInicial < 0) paginaInicial = 0;

    /*
      Se añade el evento onclick a la página de retroceso
      y llama a la función cambiar página pasándole la página actual -1
      */

    var a = document.createElement("a");
    a.setAttribute("onclick", "cambiarPagina(" + (paginaActual - 1) + ")");
    a.className = "page-link";
    a.text = "<<";
    var li = document.createElement("li");
    if (paginaActual > 0) li.className = "page-item";
    else {
        li.className = "page-item disabled";
    }
    li.appendChild(a);
    paginacion.appendChild(li);

    /*
      Creación de los botones del 1 al 6
      */

    for (var i = paginaInicial; i < paginaInicial + 6; i++) {
        if (i < numPaginas) {
            var a = document.createElement("a");
            a.setAttribute("onclick", "cambiarPagina(" + i + ")");
            a.className = "page-link";
            a.text = i + 1;
            var li = document.createElement("li");
            if (i == paginaActual) {
                li.className = "page-item active";
            } else {
                li.className = "page-item";
            }
            li.appendChild(a);
            paginacion.appendChild(li);
        }
    }

    /*
      Se añade el evento onclick a la página de avance
      y llama a la función cambiar página pasándole la página actual +1
      */

    var a = document.createElement("a");
    a.setAttribute("onclick", "cambiarPagina(" + (paginaActual + 1) + ")");
    a.className = "page-link";
    a.text = ">>";
    var li = document.createElement("li");
    if (paginaActual < numPaginas - 1) li.className = "page-item";
    else {
        li.className = "page-item disabled";
    }
    li.appendChild(a);
    paginacion.appendChild(li);
}

/*
Función a la que envía la llamada a la promesa 
en caso de "manejarError"
*/
function manejarError() {
    console.err("**********Error*************");
}
