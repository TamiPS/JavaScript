const name = document.getElementById('name'); //Selector del nombre 
const enviar = document.querySelector('button.enviar'); //Selector del botón de enviar
const listUl = document.getElementById('invitedList'); //Selector de la lista
const select = document.getElementById('select'); //Selector del selector de filtro
var arrayList;

function attachListItems(li, text) { //Se llama desde el evento enviar y se le pasa el nombre y el elemnto de la lista (li)
    let nameLi = document.createElement('span');//Se crea una etiqueta de tipo span
    nameLi.textContent = text; //Se mete en el span del li que corresponde el nombre
    li.appendChild(nameLi); //Agrega el span al elemento de la lista

    let labelLi = document.createElement('label');
    let inputLi = document.createElement('input');
    inputLi.type = 'checkbox'; //Se crea un input de tipo checkbox
    inputLi.onclick = function() { //Cuando se pulsa el checkbox
        if(this.checked)
        this.parentElement.parentElement.className = 'responded'; //Si esta marcado esta como "responded"
        else
        this.parentElement.parentElement.className = '';
    };
    labelLi.textContent = 'Confirmar'; //Se añade el texto "confirmar" a la label labelLi
    labelLi.appendChild(inputLi); //Se le añade el checkbox "inputLi"
    li.appendChild(labelLi); //Se agrega la nueva labelLi a la lista

    let editLi = document.createElement('button'); //Se crea un elemento tipo button
    editLi.onclick = function() { //En el eventro de confirmar:
        var parent = this.parentElement; //Se obtiene el padre del boton
        var span = parent.children[0]; //Se obtiene el nombre
        if(this.textContent == 'Editar'){ //Si se selecciona editar
            var span_html = span.innerHTML; //Guardamos el nombre
            var inputSpan = document.createElement('input'); //Se crea un campo input...
            inputSpan.type = 'text'; //...De tipo texto
            inputSpan.value = span_html; //Se mete el valor del nombre en el valor del input
            span.innerHTML = ''; //Y se borra del span
            span.appendChild(inputSpan); //Se añade el input nuevo al span
            this.textContent = 'Salvar'; //Y el botón pasa a ser "salvar"
        }else{ //Si no es editar, es salvar
            var inputSpan = span.children[0]; //Nuevo input en editar
            var span_html = inputSpan.value; //Se mete en span_html el nuevo nombre
            if(checkNames(span_html)){ //Llama a la función checknames y le pase el nuevo
                span.innerHTML = span_html; //Lo guardas
                this.textContent = 'Editar'; //Si no existe lo edita
            }else{
                alert('El nombre ya existe.'); //El nombre no puede repetirse editándolo
            }
        }
    };
    editLi.textContent = 'Editar'; //se añade el texto "editar" a la editLi
    li.appendChild(editLi); //se añade el boton editLi a la lista

    let removeLi = document.createElement('button'); //Se crea un boton eliminar
    removeLi.onclick = function() { //Se le añade una función
        var parent = this.parentElement; //Padre (li)
        var superParent = parent.parentElement; // padre del padre (ul)
        if(confirm("¿Seguro que lo quieres eliminar?")){
            superParent.removeChild(parent); //Eliminar el elemento de la lista
        }
    };
    removeLi.textContent = 'Eliminar'; //Se pone el texto eliminar en el boton
    li.appendChild(removeLi); //Se añade el boton removeLi a la li
}

function checkNames(n){
    var namesSpan = document.querySelectorAll('span'); //Selecciona todos los span
    for (let i = 0; i < namesSpan.length; i++) {
        if(namesSpan[i].textContent == n){ //Los recorre con n para ver si se repite
            return false;
        }
    }
    return true;
}

function mostartConfirmados(){ 
    var lista = listUl.children; //Guarda en lista la ul
    for (let i = 0; i < lista.length; i++) {
        if(select.value == 'confirmados'){ //Si esta como "Confirmados" el select
            if(!lista[i].children[1].children[0].checked){ //Recoges el checked, si no lo esta...
                lista[i].style.display = "none"; //Esconde las no confirmadas
            }
        }
        else{
            lista[i].style.display = ""; //Si no no esconde nada
        }
    }
}
 
enviar.addEventListener('click', () => { //Evento del boton enviar
    event.preventDefault(); //Evita que el formulario haga submit
    if(name.value.trim()){ //Si has metido algo (no espacios)
        if(checkNames(name.value.trim())){ //y si no esta repetido
            let li = document.createElement('li'); //Se crea un nuevo li
            attachListItems(li, name.value.trim()); //con todas sus cosas
            listUl.appendChild(li); //Se añade al ul
            name.value = ''; //Se deja el campo en blanco
            mostartConfirmados(); //Y se llama a los confirmados
        }
        else{
            alert('El nombre ya existe.'); //Si no checknames, devuelve error
        }
    }
});

select.addEventListener('change', () => { //Cuando se cambia de elemento en el select
    mostartConfirmados(); //Llama a la función mostrar confirmados
});
