<h1>Formularios</h1>
En formulario.html se encuentra el formulario.

<h2>Estilo</h2>
Tanto en inicio de sesión como en registro he añadido un estilo para que se marce el borde rojo o verde según validez cuando tenga hover.

                /*input.dirty:not(:focus):invalid {
                    border: 1px solid red;
                }

                input.dirty:not(:focus):valid {
                    border: 1px solid green;
                }*/

La función es:

            /*function initInputs() {
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
            }*/

<h2>Formulario de registro:</h2>

           /* <form action="#" method="post" id="Formulario">
                        <div class="grid-label"><label for="FormularioNombre">Nombre*</label></div>
                        <div><input type="text" id="FormularioNombre" name="FormularioNombre" pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}" required/></div>
                        <div class="grid-label"><label for="FormularioApellido">Apellido*</label></div>
                        <div><input type="text" id="FormularioApellido" name="FormularioApellido" pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}" required/></div>
                        <div class="grid-label"><label for="FormularioTelefonoEmail">E-mail o Teléfono*</label></div>
                        <div><input type="text" id="FormularioTelefonoEmail" name="FormularioTelefonoEmail" required/></div>
                        <div class="grid-label"><label for="FormularioPassword">Password*</label></div>
                        <div><input type="password" id="FormularioPassword" name="FormularioPassword" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{8,64}$" required /></div>
                        <div class="grid-label"><label for="FormularioPasswordDos">Repite Password*</label></div>
                        <div><input type="password" id="FormularioPasswordDos" name="FormularioPasswordDos" required /></div>
                        <div class="grid-label"><label for="FormularioFecha">Fecha de nacimiento</label></div>
                        <div><input type="date" id="FormularioFecha" name="FormularioFecha" /></div>
                        <div class="grid-button"><button type="submit">Registrarse</button></div>
                    </div>
                    <div id="FormularioResultado" class="alert-success"></div>
                </fieldset>
            </form>*/
			
	Los campos nombre, apellido, e-mail o teléfono, y password estan marcados como Required, es decir, deben rellenarse.
	Los campos nombre, apellido y password tienen un pattern.
	
<h2>Formulario de inicio de sesión:</h2>

			/*<form action="#" method="post" id="IniciarSesion">
                <fieldset>
                    <legend><b>Iniciar sesión</b> </legend>
                    <br>
                    <div class="grid">
                        <div class="grid-label"><label for="IniciarSesionTelefonoEmail">E-mail o Teléfono*</label></div>
                        <div><input type="text" id="IniciarSesionTelefonoEmail" name="IniciarSesionTelefonoEmail" required /></div>
                        <div class="grid-label"><label for="IniciarSesionPassword">Password*</label></div>
                        <div><input type="password" id="IniciarSesionPassword" name="IniciarSesionPassword" required /><input type="checkbox" onclick="showPassword(this)">Mostrar Password</div>
                        <div class="grid-button"><button type="submit">Iniciar Sesión</button></div>
                    </div>
                    <div id="IniciarSesionResultado"></div>
                </fieldset>
            </form>*/
			
	Ambos casos son required.
	Para la password he añadido una casilla checkbox para mostrar u ocultar la contaseña, esta casilla llama a la función showPassword:
	
				/*function showPassword(checkbox) {
				var pass = document.getElementById("IniciarSesionPassword");
				if (checkbox.checked) {
					pass.type = "text";
				} else {
					pass.type = "password";
				}
			}*/
			
	Convierte el campo iniciarSesionPassword en tipo texto o tipo password.
		
<h2>Funciones</h2>

/*script type="text/javascript" src="validacion.js">*/

La clase validación se incluye en un script y llama a las siguientes funciones:

        /*initSession();
        initForm();
        initInputs();
        initConfirmPass();
        initConfirmTelefonoEmail();
        */

<h3> initSession();</h3>

Comprueba si existen las cookies.<br>
Si es así y la sesión esta iniciada (no es vacío) se muestra el botón.<br>

            /*function initSession() {
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

Si no está iniciada y se intenta iniciar sesión comprueba las cookies creadas y compara los datos con los de estas.<br>
Si coinciden, inicializa lac cookies con 1 hora de duración.

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
            }*/

<h3> initForm();</h3>

Recoge los datos del formulario cuando se pulsa enviar.<br>
checkValidity es una función de JS.<br>
Si es true, crea la cookie del usuario y de la password, y devuelve un mensaje en la etiqueta FormularioResultado indicando que te has registrado.<br>
evt.preventDefault es un evento para anular que ocurra un evento.

            /*function initForm() {
                var form = document.getElementById("Formulario");
                var resultado = document.getElementById("FormularioResultado");
                form.addEventListener("submit", function(evt) {
                    if (form.checkValidity() === false) {
                        evt.preventDefault();
                        return false;
                    } else {
                        evt.preventDefault();
                        var user = document.getElementById('FormularioTelefonoEmail').value;
                        var pass = document.getElementById('FormularioPassword').value;
                        setCookie('usuario', user);
                        setCookie('password', pass);
                        resultado.style.display = 'block';
                        resultado.innerHTML = "Te has registrado correctamente.";
                        return false;
                    }
                });
            }*/

<h3> initInputs();</h3>

Aparece en el primer punto. <br>
Sirve para aplicar estilo a los bordes de las casillas en función de si se han rellenado bien o mal.

<h3> initConfirmPass();</h3>

Recoge la password2 y la primera password y las comprara, <br>
en caso de no coincidir devuelve un mensaje de error.

            /*function initConfirmPass() {
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
            }*/

<h3> initConfirmTelefonoEmail();</h3>

Verifica si el campo cumple con el pattern del teléfono o con el pattern del email.<br>
Devuelve mensaje si es incorrecto.

            /*function initConfirmTelefonoEmail() {
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
            }*/
<h2>Cookies</h2>

<h3>setCookie</h3>

Setea la cookie, hay que pasarle nombre, valor y tiempo de expiración.<br>
El nombre es el que se le da, por ejemplo usuario, el value es lo que recoge del html y el tiempo lo seteamos en una hora.

            /*function setCookie(cname, cvalue, exhours) {
                var d = new Date();
                d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
                var expires = "expires=" + d.toGMTString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";*/
            }

<h3>getCookie</h3>

Recoge la cookie para comprobar los datos.

            /*function getCookie(cname) {
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
            }*/

<h2>Test de Validación</h2>

El test de validación se ha realizado con Katalon como extensión de Chrome.<br>
Se han realizado test para los siguientes casos.<br>
![Lista de Test](/myFolder/TestRealizados.jpg)
