class Juego {

    constructor(cvs, cvsNext, componentes) {
        this.ctx = cvs.getContext("2d");
        this.ctxNext = cvsNext.getContext("2d"); //el canvas de pieza siguiente
        this._tablero = new Tablero(20, 10, 20, this.ctx);
        this._pieza = this.piezaAleatoria(this._tablero);
        this.gameOver = false;
        this._comenzarCaer = Date.now();

        this._tableroNext = new Tablero(4, 4, 20, this.ctxNext);
        this._tableroNext.dibujarTablero();
        this.piezaSiguiente = this.piezaAleatoria(this._tableroNext);

        this.lineas = 0;
        this.velocidad = 1000;
        this.componentes = componentes; //paso componentes para modificarlos en el html, tiene que estar compuesto de un contenedor (display), una variable (puntuacionMaxima) y un botón (boton)
        this.componentes.boton.disabled = true;
    }

    // devuelve una pieza aleatoria
    piezaAleatoria = (tablero) => { //paso tablero en el que se dibujara la pieza
        var piezaR = Math.floor(Math.random() * PIEZAS.length);
        return new Pieza(PIEZAS[piezaR][0], PIEZAS[piezaR][1], tablero, this);// paso "this", es decir juego para poder manipular las propiedades del juego desde la clase pieza
    }

    get tablero() {
        return this._tablero;
    }

    get pieza() {
        return this._pieza;
    }
    set pieza(pieza) {
        this._pieza = pieza;
    }

    get comenzarCaer() {
        return this._comenzarCaer;
    }
    set comenzarCaer(comenzarCaer) {
        this._comenzarCaer = comenzarCaer;
    }

    caer = () => {
        let ahora = Date.now();
        let delta = ahora - this.comenzarCaer;
        if (delta > this.velocidad) {
            this.pieza.moverAbajo();
            this.comenzarCaer = Date.now();
        }
        if (!this.gameOver) {
            this.componentes.display.innerHTML = "Lineas: " + this.lineas + "<br>Puntuación: " + this.lineas * 10 + "<br>Puntuación Maxima: " + this.componentes.puntuacionMaxima;
            this._tableroNext.dibujarTablero();
            this.piezaSiguiente._x = 0;
            this.piezaSiguiente._y = 0;
            this.piezaSiguiente.dibujar();
            requestAnimationFrame(this.caer);
        }
        else{
            this.componentes.boton.disabled = false;
            if(this.componentes.puntuacionMaxima < this.lineas * 10){
                this.componentes.puntuacionMaxima = this.lineas * 10;
            }
            this.componentes.display.innerHTML = "<h1>GAME OVER</h1><br>Puntuación: " + this.lineas * 10 + "<br>Puntuación Maxima: " + this.componentes.puntuacionMaxima;
        }
    }

    control = (event) => {
        if(!this.gameOver) { //si no ha finalizado el juego se continua leyendo las pulsaciones de teclado
            if (event.keyCode == 37) {
                this.pieza.moverIzquierda();
                this.comenzarCaer = Date.now();
            } else if (event.keyCode == 38) {
                this.pieza.rotar();
                this.comenzarCaer = Date.now();
            } else if (event.keyCode == 39) {
                this.pieza.moverDerecha();
                this.comenzarCaer = Date.now();
            } else if (event.keyCode == 40) {
                this.pieza.moverAbajo();
            }
        }
    }

}
