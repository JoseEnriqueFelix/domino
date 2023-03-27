function setup() {
    createCanvas(800, 800);
    background(200)
    // primer usuario

    dibujarFichasUsuario(0, 200, 50)
    dibujarFichasUsuario(1, 750, 225)
    dibujarFichasUsuario(2, 200, 750)
    dibujarFichasUsuario(3, 50, 225)
    dibujarTablero()

    main()
}

fichasJugadores = []
fichasJuego = []
const dibujarFichasUsuario = (numeroUsuario, initialX, initialY) => {
    let fichas = obtenerFichasUsuario();
    fichasJugadores.push(fichas)
    let i = 0;
    let esPar = numeroUsuario % 2 == 0;
    // TODO: simplificar esto
    let multiplicadorX = esPar ? 60 : 0;
    let multiplicadoY = esPar ? 0 : 60;
    for (const ficha of fichas) {
        let x = initialX + (multiplicadorX * i);
        let y = initialY + (multiplicadoY * i);
        const fichaD = {
            x,
            y,
            ladoA: ficha.ladoA,
            ladoB: ficha.ladoB,
            ejeX: !esPar
        }
        dibujarFicha(fichaD)
        fichasJuego.push({ ...fichaD, numeroUsuario })
        i++;
    }
}

function dibujarTablero() {
    noFill();
    strokeWeight(5);
    rect(100, 100, 600, 600);

    strokeWeight(2);
    for (let i = 0; i < 7; i++) {
        rect(110 + i * 80, 150, 30, 60); // rectángulo superior
        rect(110 + i * 80, 510, 30, 60); // rectángulo inferior
    }
}

const fichasAsignadas = new Set();
const fichast = []
const fichast1 = []
const obtenerFichasUsuario = () => {
    const fichas = []
    for (let index = 0; index < 7; index++) {
        let ladoA = monteCarlo()
        let ladoB = monteCarlo()

        while (fichasAsignadas.has(`${ladoA}-${ladoB}`) || fichasAsignadas.has(`${ladoB}-${ladoA}`)) {
            ladoA = monteCarlo()
            ladoB = monteCarlo()
        }

        fichasAsignadas.add(`${ladoA}-${ladoB}`)
        fichas.push({ ladoA, ladoB })
    }
    return fichas;
}

const dibujarFicha = ({ x, y, ladoA, ladoB, ejeX }) => {
    let fichaAlto = ejeX ? 30 : 60
    let fichaAncho = ejeX ? 60 : 30

    let newX = x - (fichaAncho / 2)
    let newY = y - (fichaAlto / 2)

    strokeWeight(1)
    rect(newX, newY, fichaAncho, fichaAlto, 3.5)
    if (ejeX) {
        line(newX + fichaAncho / 2, newY, newX + fichaAncho / 2, newY + fichaAlto)
    } else {
        line(newX, newY + (fichaAlto / 2), newX + fichaAncho, newY + (fichaAlto / 2));
    }
    let pointWeight = 7.5;
    strokeWeight(pointWeight)

    dibujarPuntos(newX, newY, ladoA, ejeX)
    if (ejeX) {
        newX += fichaAlto;
    } else {
        newY += fichaAncho;
    }
    dibujarPuntos(newX, newY, ladoB, ejeX)
    strokeWeight(1)
}

const dibujarPuntos = (x, y, puntos, ejeX) => {
    let fichaAlto = ejeX ? 60 : 30
    let fichaAncho = ejeX ? 30 : 60
    switch (puntos) {
        case 1:
            if (ejeX) {
                point(x + (fichaAncho * 0.5), y + (fichaAlto * 0.25))
            } else {
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.5))
            }
            break;
        case 2:
            if (ejeX) {
                point(x + (fichaAncho * 0.35), y + (fichaAlto * 0.15))
                point(x + (fichaAncho * 0.70), y + (fichaAlto * 0.35))
            } else {
                point(x + (fichaAncho * 0.15), y + (fichaAlto * 0.35))
                point(x + (fichaAncho * 0.35), y + (fichaAlto * 0.70))
            }
            break;
        case 3:
            if (ejeX) {
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.375))
                point(x + (fichaAncho * 0.5), y + (fichaAlto * 0.25))
                point(x + (fichaAncho * 0.75), y + (fichaAlto * 0.125))
            } else {
                point(x + (fichaAncho * 0.375), y + (fichaAlto * 0.25))
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.5))
                point(x + (fichaAncho * 0.125), y + (fichaAlto * 0.75))
            }
            break;
        case 4:
            if (ejeX) {
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.125))
                point(x + (fichaAncho * 0.75), y + (fichaAlto * 0.125))
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.375))
                point(x + (fichaAncho * 0.75), y + (fichaAlto * 0.375))
            } else {
                point(x + (fichaAncho * 0.125), y + (fichaAlto * 0.25))
                point(x + (fichaAncho * 0.125), y + (fichaAlto * 0.75))
                point(x + (fichaAncho * 0.375), y + (fichaAlto * 0.25))
                point(x + (fichaAncho * 0.375), y + (fichaAlto * 0.75))
            }
            break;
        case 5:
            if (ejeX) {
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.125))
                point(x + (fichaAncho * 0.75), y + (fichaAlto * 0.125))
                point(x + (fichaAncho * 0.5), y + (fichaAlto * 0.25))
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.375))
                point(x + (fichaAncho * 0.75), y + (fichaAlto * 0.375))
            } else {
                point(x + (fichaAncho * 0.125), y + (fichaAlto * 0.25))
                point(x + (fichaAncho * 0.125), y + (fichaAlto * 0.75))
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.5))
                point(x + (fichaAncho * 0.375), y + (fichaAlto * 0.25))
                point(x + (fichaAncho * 0.375), y + (fichaAlto * 0.75))
            }
            break;
        case 6:
            if (ejeX) {
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.1))
                point(x + (fichaAncho * 0.75), y + (fichaAlto * 0.1))
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.25))
                point(x + (fichaAncho * 0.75), y + (fichaAlto * 0.25))
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.4))
                point(x + (fichaAncho * 0.75), y + (fichaAlto * 0.4))
            } else {
                point(x + (fichaAncho * 0.1), y + (fichaAlto * 0.25))
                point(x + (fichaAncho * 0.1), y + (fichaAlto * 0.75))
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.25))
                point(x + (fichaAncho * 0.25), y + (fichaAlto * 0.75))
                point(x + (fichaAncho * 0.4), y + (fichaAlto * 0.25))
                point(x + (fichaAncho * 0.4), y + (fichaAlto * 0.75))
            }
            break;
    }
}

function monteCarlo() {
    let random = Math.random();
    let valor;
    if (random <= 1 / 7) {
        valor = 0
    } else if (random > 1 / 7 && random <= 2 / 7) {
        valor = 1
    }
    else if (random > 2 / 7 && random <= 3 / 7) {
        valor = 2
    }
    else if (random > 3 / 7 && random <= 4 / 7) {
        valor = 3
    }
    else if (random > 4 / 7 && random <= 5 / 7) {
        valor = 4
    }
    else if (random > 5 / 7 && random <= 6 / 7) {
        valor = 5
    }
    else {
        valor = 6
    }
    return valor
}


const main = async () => {
    // mucho código para algo simple
    let ordenes = fichasJugadores.map((fichas) => {
        return fichas.findIndex((ficha) => {
            return ficha.ladoA == 6 && ficha.ladoB == 6;
        });
    });
    let jugadorIndex = ordenes.findIndex((orden) => { return orden != -1 });
    if (jugadorIndex == -1)
        throw new Error("Internal error. Mala generación de fichas");

    tratarDeTirarFicha(jugadorIndex, true);
    while (true) {
        jugadorIndex = (jugadorIndex + 1) % 4;
        await wait(1000);
        tratarDeTirarFicha(jugadorIndex, false);

        if (fichasJugadores[jugadorIndex].length == 0) {
            text(`Ganó el jugador ${jugadorIndex}`, 0, 0, 100, 100);
            break;
        }

        if (numberOfSkips == 4) {
            const puntosJugadores = fichasJugadores.map(
                (fichasJugador) => {
                    const data = fichasJugador.map((ficha) => {
                        if (ficha.ladoA == 0 && ficha.ladoB == 0) return 50;
                        return ficha.ladoA + ficha.ladoB;
                    });
                    return data.reduce((a, b) => a + b, 0);
                }
            )

            let MIN_POINTS = 0;
            const winnerPlayersIndexes = [];
            for (let i = 0; i < puntosJugadores.length; i++) {
                const puntosJugador = puntosJugadores[i];
                if (puntosJugador > MIN_POINTS) {
                    MIN_POINTS = puntosJugador;
                }
            }

            for (let i = 0; i < puntosJugadores.length; i++) {
                const puntosJugador = puntosJugadores[i];
                if (puntosJugador == MIN_POINTS) {
                    winnerPlayersIndexes.push(i);
                }
            }

            let message = "";
            if (winnerPlayersIndexes.length == 1) {
                message = `Ganó el jugador ${winnerPlayersIndexes[0]}`
            } else {
                message = `Los jugadores ${winnerPlayersIndexes.join(", ")} ganaron`
            }
            stroke(0, 0, 0)
            fill(0, 0, 0)
            text(message, 0, 0, 100, 100);
            return;
        }
    }
};

function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

tablero = [6, 6]
let numberOfSkips = 0;
const tratarDeTirarFicha = async (jugadorIndex, isFirst) => {
    let ladoPorElCualRevisar = Math.floor(Math.random() * 2);
    const fichasJugador = fichasJugadores[jugadorIndex];

    let numeroPorRevisar = tablero[ladoPorElCualRevisar];
    const index = fichasJugador.findIndex((ficha) => {
        if (isFirst) {
            return ficha.ladoA == numeroPorRevisar && ficha.ladoB == numeroPorRevisar;
        }
        return ficha.ladoA == numeroPorRevisar || ficha.ladoB == numeroPorRevisar;
    });

    if (index == -1) {
        console.log("No se encontró ficha")
        numberOfSkips++;
        mostrarSkip(jugadorIndex)
        return;
    }
    numberOfSkips = 0;
    const ficha = fichasJugador[index];
    seleccionarFicha(ficha)
    await wait(1000);
    quitarFicha(ficha)

    fichasJugador.splice(index, 1);

    if (ficha.ladoA == numeroPorRevisar) {
        tablero[ladoPorElCualRevisar] = ficha.ladoB;
    } else {
        tablero[ladoPorElCualRevisar] = ficha.ladoA;
    }
};

let index = 0;
const quitarFicha = (ficha) => {
    const fichaIndex = fichasJuego.findIndex((fichaJuego) => {
        return fichaJuego.ladoA == ficha.ladoA && fichaJuego.ladoB == ficha.ladoB;
    });

    if (fichaIndex == -1) return;
    const fichaPorQuitar = fichasJuego[fichaIndex];

    // quitar ficha
    // TODO: propagar esto
    let fichaAlto = fichaPorQuitar.ejeX ? 30 : 60
    let fichaAncho = fichaPorQuitar.ejeX ? 60 : 30

    let newX = fichaPorQuitar.x - (fichaAncho / 2)
    let newY = fichaPorQuitar.y - (fichaAlto / 2)

    rect(newX, newY, fichaAncho, fichaAlto, 3.5)
    // text(index, newX + (fichaAncho / 2), newY + (fichaAlto / 2))
    // text(index, fichaPorQuitar.x + (fichaAncho / 2), fichaPorQuitar.y + (fichaAlto / 2))

    index++;

    fichasJuego.splice(index, 1);
};

const seleccionarFicha = (ficha) => {
    const fichaIndex = fichasJuego.findIndex((fichaJuego) => {
        return fichaJuego.ladoA == ficha.ladoA && fichaJuego.ladoB == ficha.ladoB;
    });

    if (fichaIndex == -1) return;
    const fichaPorQuitar = fichasJuego[fichaIndex];

    // quitar ficha
    // TODO: propagar esto
    let fichaAlto = fichaPorQuitar.ejeX ? 30 : 60
    let fichaAncho = fichaPorQuitar.ejeX ? 60 : 30

    let newX = fichaPorQuitar.x - (fichaAncho / 2)
    let newY = fichaPorQuitar.y - (fichaAlto / 2)

    stroke(255, 255, 0);
    rect(newX, newY, fichaAncho, fichaAlto, 3.5);

    stroke(0, 0, 0)
};

const mostrarSkip = async (jugadorIndex) => {
    textSize(32);
    fill(255, 0, 0)
    stroke(255, 0, 0)
    switch (jugadorIndex) {
        case 0:
            text(`X`, 400, 125);
            break;
        case 1:
            text(`X`, 625, 400);
            break;
        case 2:
            text(`X`, 400, 700);
            break;
        case 3:
            text(`X`, 100, 400);
            break;
    }
    await wait(1000);
    noStroke()
    fill(200, 200, 200);
    switch (jugadorIndex) {
        case 0:
            rect(400, 100, 40, 40)
            break;
        case 1:
            rect(625, 375, 40, 40)
            break;
        case 2:
            rect(400, 675, 40, 40)
            break;
        case 3:
            rect(100, 375, 40, 40)
            break;
    }

    fill(255, 255, 255)
    stroke(0, 0, 0)
}