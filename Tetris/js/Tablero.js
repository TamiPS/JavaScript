class Tablero {
    constructor(filas, columnas, tamanoCuadrado, ctx) {
        // inicializa el tablero todos los elementos de color WHITE
        this._filas = filas;
        this._columnas = columnas;
        this.TC = tamanoCuadrado;
        this.ctx = ctx;
        this._lineas = 0;
        this.tablero = [];
        for (var f = 0; f < this._filas; f++) {
            this.tablero[f] = [];
            for (var c = 0; c < this._columnas; c++) {
                this.tablero[f][c] = "WHITE";
            }
        }
    }

    // Es vacio si tiene el color WHITE
    esVacio = (x, y) => {
        if (this.tablero[y][x] == "WHITE") {
            return true;
        } else {
            return false;
        }
    }

    // Dibuja un en el canvas del color recibido
    dibujarCasilla = (x, y, color) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.TC, y * this.TC, this.TC, this.TC);
        this.ctx.strokeStyle = "BLACK";
        this.ctx.strokeRect(x * this.TC, y * this.TC, this.TC, this.TC);
    }

    // dibujar en el canvas según los colores del tablaro
    dibujarTablero = () => {
        for (var f = 0; f < this._filas; f++) {
            for (var c = 0; c < this._columnas; c++) {
                this.dibujarCasilla(c, f, this.tablero[f][c]);
            }
        }

    };

    get filas() { return this._filas; }

    set filas(fila) { this._filas = fila; }

    get columnas() { return this._columnas; }

    set columnas(columna) { this._columnas = columna; }

    get puntos() { return this._puntos; }

    get lineas() { return this._lineas; }

    //Devuelve el color del tablero en la casilla indicada
    getCasilla = (f, c) => {
        return this.tablero[f][c];
    }

    //Cambiar el color del tablero en la casilla indicada
    setCasilla = (f, c, color) => {
        this.tablero[f][c] = color;
    }

    // Eliminamos las filas que estén completas e incrementamos la puntuación
    eliminarFilasCompletas = () => {
        for (var f = 0; f < this._filas; f++) {
            let isRowFull = true;
            for (var c = 0; c < this._columnas; c++) {
                isRowFull = isRowFull && (!this.esVacio(c, f));
            }
            if (isRowFull) {
                for (var y = f; y > 1; y--) {
                    for (var c = 0; c < this._columnas; c++) {
                        this.tablero[y][c] = this.tablero[y - 1][c];
                        this.tablero[8][10] = this.tablero[7][10];
                    }
                }
                for (var c = 0; c < this._columnas; c++) {
                    this.tablero[0][c] = "WHITE";
                }
                this._lineas++;
            }
        }
        return this._lineas;//devuelve el total de lineas solucionadas en el tablero
    }
}
