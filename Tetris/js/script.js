const cvs = document.getElementById("tetris");
const cvsNext = document.getElementById("tetromino");
const maxPuntuacion = 0;
const componentes = {display: document.getElementById("puntuacion"), puntuacionMaxima: maxPuntuacion, boton: document.getElementById("jugar")}
jugar();

function jugar(){
    var juego = new Juego(cvs, cvsNext, componentes);
    document.addEventListener("keydown", juego.control);
    juego.tablero.dibujarTablero();
    juego.caer();
}
