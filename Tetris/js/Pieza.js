// las piezas y sus colores
const PIEZAS = [
    [Z, "orange"],
    [S, "cyan"],
    [T, "green"],
    [O, "grey"],
    [L, "purple"],
    [I, "red"],
    [J, "yellow"]
];

// La clase pieza
class Pieza {

    constructor(tetromino, color, tablero, juego) { //paso juego para poder acceder y modificar los valores del juego
        // propiedades numeroForma, tetrominioActual, posición x e y en el canvas
        this._tetromino = tetromino;
        this._color = color;
        this._tablero = tablero;
        this._x = 3;
        this._y = -3;
        this.n = 0;
        this.activeTetromino = this._tetromino[this.n];
        this._juego = juego;
    }

    // rota la piezaentre las distintas formas del tetrominio
    // se debe controlar que si está muy cerca de las paredes algunas no pueden girar
    rotar = () => {
        this.n = (this.n + 1) % this._tetromino.length;
        //Patada
        if(this.colision(0, 0, this._tetromino[this.n])){
            if(this._x > (this._tablero.columnas/2)){
                if (!this.colision(-1, 0, this._tetromino[this.n])) {
                    this.borrar();
                    this._x--;
                    this.activeTetromino = this._tetromino[this.n];
                    this.dibujar();
                    this.errorAPosta();
                }
                else{
                    this.errorAPosta();//es para que continue bajando
                }
            }
            if(this._x < (this._tablero.columnas/2)){
                if (!this.colision(1, 0, this._tetromino[this.n])) {
                    this.borrar();
                    this._x++;
                    this.activeTetromino = this._tetromino[this.n];
                    this.dibujar();
                    this.errorAPosta();
                }
                else{
                    this.errorAPosta();//es para que continue bajando
                }

            }
        }
        if (!this.colision(0, 0, this._tetromino[this.n])) {
            this.borrar();
            this.activeTetromino = this._tetromino[this.n];
            this.dibujar();
            this.errorAPosta();
        }
        else{
            this.errorAPosta();//es para que continue bajando
        }
    }


    // rellena el tetromino de la pieza con su color en el canvas
    rellenar = (color) => {
        for (var f = 0; f < this.activeTetromino.length; f++) {
            for (var c = 0; c < this.activeTetromino.length; c++) {
                if (this.activeTetromino[f][c]) {
                    this._tablero.dibujarCasilla(this._x + c, this._y + f, color);
                }
            }
        }
    }

    // dibuja el color de una pieza
    dibujar = () => { this.rellenar(this._color); }

    // borra una pieza rellenandola de casillas blancas
    borrar = () => { this.rellenar("WHITE"); }

    // mover abajo la pieza, si queda fijada, deberá obtener una nueva
    moverAbajo = () => {
        if (!this.colision(0, 1, this.activeTetromino)) {
            this.borrar();
            this._y++;
            this.dibujar();
        } else {
            this.fijar();
            //Creo la nueva pieza con algunas de las propiedades de la pieza siguiente y con el tablero de la pieza actual
            this._juego.pieza = new Pieza(this._juego.piezaSiguiente._tetromino, this._juego.piezaSiguiente._color, this._juego.pieza._tablero, this._juego.piezaSiguiente._juego);
            this._juego.piezaSiguiente = this._juego.piezaAleatoria(this._juego._tableroNext); //Creo la pieza siguente
        }
    }

    // mover derecha la pieza hasta chocar con la pared
    moverDerecha = () => {
        if (!this.colision(1, 0, this.activeTetromino)) {
            this.borrar();
            this._x++;
            this.dibujar();
            this.errorAPosta();//es para que continue bajando
        }
        else{
            this.errorAPosta();//es para que continue bajando
        }
    }

    // mover izquierda la pieza hasta chocar con la pared
    moverIzquierda = () => {
        if (!this.colision(-1, 0, this.activeTetromino)) {
            this.borrar();
            this._x--;
            this.dibujar();
            this.errorAPosta();//es para que continue bajando
        }
        else{
            this.errorAPosta();//es para que continue bajando
        }
    }

    // fijar pieza cuando choca con el suelo u otra pieza
    // hay que comprobar si se ha formado una o varias lineas para borrarlas
    fijar = () => {
        for (var f = 0; f < this.activeTetromino.length; f++) {
            for (var c = 0; c < this.activeTetromino.length; c++) {
                if (!this.activeTetromino[f][c]) {
                    continue;
                }
                if (this._y + f < 0) {
                    this._juego.gameOver = true;
                    break;
                }
                this._tablero.setCasilla(this._y + f, this._x + c, this._color);
            }
        }
        //Si se completan filas se aumenta la velocidad
        if((this._tablero.eliminarFilasCompletas() - this._juego.lineas) > 0){
            this._juego.velocidad = this._juego.velocidad - ((this._tablero.eliminarFilasCompletas() - this._juego.lineas)*50);
        }
        this._juego.lineas = this._tablero.eliminarFilasCompletas();
        this._tablero.dibujarTablero();
    }

    // Comprueba si se produce una colisión de una pieza con el suelo u otra pieza
    colision = (x, y, pieza) => {
        for (var f = 0; f < pieza.length; f++) {
            for (var c = 0; c < pieza.length; c++) {
                if (!pieza[f][c]) {
                    continue;
                }

                let nuevaX = this._x + c + x;
                let nuevaY = this._y + f + y;

                if (nuevaX < 0 || nuevaX >= this._tablero.columnas || nuevaY >= this._tablero.filas) { //Colisión con bordes
                    return true;
                }
                if (nuevaY < 0) {
                    continue;
                }
                if (!this._tablero.esVacio(nuevaX, nuevaY)) { //Colisión con pieza
                    return true;
                }
            }
        }
        return false;
    }

    errorAPosta(){
        Sigue_bajando;
    }
}
