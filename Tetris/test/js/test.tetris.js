var tablero1 = new Tablero(20, 10);
tablero1.tablero = [ ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","red","red","red","red","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","yellow","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","yellow","yellow","yellow","WHITE","WHITE","WHITE"] ];

var tablero2 = new Tablero(20, 10);
tablero2.tablero = [ ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE","WHITE"],
                    ["WHITE","WHITE","WHITE","orange","orange","WHITE","WHITE","WHITE","orange","yellow"],
                    ["red","red","red","red","yellow","orange","orange","orange","orange","yellow"],
                    ["red","red","red","red","yellow","yellow","yellow","orange","yellow","yellow"] ];

var pieza1 = new Pieza(PIEZAS[0][0], PIEZAS[0][1], tablero1);
pieza1._x = 0;
pieza1._y = 0;

var pieza2 = new Pieza(PIEZAS[0][0], PIEZAS[0][1], tablero1);
pieza2._x = 4;
pieza2._y = 6;

var assert = chai.assert,
    expect = chai.expect;
suite("Testing esVacio, valores verdaderos", function() {
    test("Test pasado", function() {
        expect(tablero1.esVacio(0, 0)).to.equal(true)
    }), test("Test pasado", function() {
        expect(tablero1.esVacio(8, 4)).to.equal(true)
    }), test("Test pasado", function() {
        expect(tablero1.esVacio(3, 19)).to.equal(true)
    }), test("Test pasado", function() {
        expect(tablero1.esVacio(4, 17)).to.equal(true)
    }), test("Test pasado", function() {
        expect(tablero1.esVacio(2, 5)).to.equal(true)
    })
}), suite("Testing esVacio, valores falsos", function() {
    test("Test pasado", function() {
        expect(tablero1.esVacio(4, 6)).to.equal(false)
    }), test("Test pasado", function() {
        expect(tablero1.esVacio(5, 6)).to.equal(false)
    }), test("Test pasado", function() {
        expect(tablero1.esVacio(4, 18)).to.equal(false)
    }), test("Test pasado", function() {
        expect(tablero1.esVacio(6, 19)).to.equal(false)
    }), test("Test pasado", function() {
        expect(tablero1.esVacio(4, 19)).to.equal(false)
    })
}), suite("Testing eliminarFilasCompletas, devuelve 0 filas eliminadas", function() {
    test("Test pasado", function() {
        expect(tablero1.eliminarFilasCompletas()).to.equal(0)
    })
}), suite("Testing eliminarFilasCompletas, devuelve el total de 2 filas eliminadas en el tablero", function() {
    test("Test pasado", function() {
        expect(tablero2.eliminarFilasCompletas()).to.equal(2)
    })
}), suite("Testing colision, devuelve que no hay colisión", function() {
    test("Test pasado", function() {
        expect(pieza1.colision(0, 0, pieza1.activeTetromino)).to.equal(false)
    })
}), suite("Testing colision, devuelve que hay colisión", function() {
    test("Test pasado", function() {
        expect(pieza2.colision(0, 0, pieza2.activeTetromino)).to.equal(true)
    })
});
