const form = document.getElementById("Formulario");
var resultado = document.getElementById("FormularioResultado");
var user = document.getElementById('FormularioTelefonoEmail').value;
var pass = document.getElementById('FormularioPassword').value;

form.addEventListener("submit", function(evt) {
    evt.preventDefault();

   if (form.checkValidity() === false) {
       return false;
   } else {
     
     
       setCookie('usuario', user);
       setCookie('password', pass);
       resultado.style.display = 'block';
       resultado.innerHTML = "Te has registrado correctamente.";
       return false;
   }
});

function initForm() {
    var form = document.getElementById("Formulario");
    var resultado = document.getElementById("FormularioResultado");
    form.addEventListener("submit", function(evt) {
         evt.preventDefault();

        if (form.checkValidity() === false) {
            return false;
        } else {
          
            var user = document.getElementById('FormularioTelefonoEmail').value;
            var pass = document.getElementById('FormularioPassword').value;
            setCookie('usuario', user);
            setCookie('password', pass);
            resultado.style.display = 'block';
            resultado.innerHTML = "Te has registrado correctamente.";
            return false;
        }
    });
}

function initSession() {
    var form = document.getElementById("IniciarSesion");
    var boton = document.getElementById("CerrarSesion");
    var sesion = getCookie('sesion');
    if (sesion != '') {
        form.style.display = 'none';
        boton.style.display = 'block';
    }
    var resultado = document.getElementById("IniciarSesionResultado");
    boton.addEventListener("click", function(evt) {
        setCookie('sesion', '', -1);
        location.reload();
    });
    form.addEventListener("submit", function(evt) {
        if (form.checkValidity() === false) {
            evt.preventDefault();
            return false;
        } else {
            evt.preventDefault();
            var user = document.getElementById('IniciarSesionTelefonoEmail').value;
            var pass = document.getElementById('IniciarSesionPassword').value;
            var usuario = getCookie('usuario');
            var password = getCookie('password');
            if (usuario != '' && password != '') {
                if (usuario == user && password == pass) {
                    setCookie('sesion', 'unahora', 1);
                    form.style.display = 'none';
                    boton.style.display = 'block';
                } else {
                    resultado.style.display = 'block';
                    resultado.className = "alert-error";
                    resultado.innerHTML = "Usuario o contraseña incorrecta.";
                }
            } else {
                resultado.style.display = 'block';
                resultado.className = "alert-warning";
                resultado.innerHTML = "Adevertencia: Codigo de error; 0001; Descripción: NO COOKIE;";
            }
            return false;
        }
    });
}

function initInputs() {
    var inputs = document.getElementsByTagName("input");
    var inputs_len = inputs.length;
    var addDirtyClass = function(evt) {
        evt.srcElement.classList.toggle("dirty", true);
    };
    for (var i = 0; i < inputs_len; i++) {
        var input = inputs[i];
        input.addEventListener("blur", addDirtyClass);
        input.addEventListener("invalid", addDirtyClass);
        input.addEventListener("valid", addDirtyClass);
    }
}

function initConfirmPass() {
    var elem = document.getElementById("FormularioPasswordDos");
    elem.addEventListener("blur", verifyPass);

    function verifyPass(input) {
        input = event.target;
        var primaryPass = document.getElementById('FormularioPassword');
        if (input.value != primaryPass.value) {
            input.setCustomValidity('Las dos passwords deben coincidir.');
        } else {
            input.setCustomValidity('');
        }
    }
}

function initConfirmTelefonoEmail() {
    var elem = document.getElementById("FormularioTelefonoEmail");
    elem.addEventListener("blur", verifyTelefonoEmail);

    function verifyTelefonoEmail(input) {
        input = event.target;
        var resultadoEmail = input.value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gi);
        var resultadoTelefono = input.value.match(/^(\+34|0034|34)?[6|7|8|9][0-9]{8}$/gi);

        if (input.value == resultadoEmail || input.value == resultadoTelefono) {
            input.setCustomValidity('');
        } else {
            input.setCustomValidity('Introduce un valor correcto.');
        }
    }
}

initSession();
initForm();
initInputs();
initConfirmPass();
initConfirmTelefonoEmail();

function showPassword(checkbox) {
    var pass = document.getElementById("IniciarSesionPassword");
    if (checkbox.checked) {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

function setCookie(cname, cvalue, exhours) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


initCompruebaIniCookie();
function initCompruebaIniCookie (){
    if(getCookie('CookieInicial')!="1"){
        document.getElementById("barraaceptacion").style.display="block";
    }
    else {
        document.getElementById("barraaceptacion").style.display="none";  
    }

}

function PonerCookie(){
    setCookie('CookieInicial','1',365);
    document.getElementById("barraaceptacion").style.display="none";
}