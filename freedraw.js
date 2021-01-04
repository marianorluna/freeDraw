//======================================================================
// VARIABLES
//======================================================================
let miCanvas = document.querySelector('#canvas-area');
let ctx = miCanvas.getContext("2d");
let lineas = [];
let correccionX = 0;
let correccionY = 0;
let pintarLinea = false;
let nuevaPosicionX = 0;
let nuevaPosicionY = 0;
let posicion = miCanvas.getBoundingClientRect()
correccionX = posicion.x;
correccionY = posicion.y;
miCanvas.width = 400;
miCanvas.height = 500;
let limpiar = document.getElementById("button-clear");
var colorSelect;
var espesorSelect = 1;
var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};
let posX = miCanvas.width / 2;
let posY = miCanvas.height / 2;
//======================================================================
// FUNCIONES
//======================================================================
// Empieza a dibujar la línea
function empezarDibujo() {
    pintarLinea = true;
    lineas.push([]);
};
// Guarda la posición de la nueva línea
function guardarLinea() {
    lineas[lineas.length - 1].push({
        x: nuevaPosicionX,
        y: nuevaPosicionY
    });
}
// Dibuja la linea
function dibujarLinea(event) {
    event.preventDefault();
    if (pintarLinea) {
        ctx = miCanvas.getContext('2d')
        // Estilos de linea
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.lineWidth = espesorSelect;
        // Color de la linea
        ctx.strokeStyle = colorSelect;
        // Marca el nuevo punto
        if (event.changedTouches == undefined) {
            // Versión ratón
            nuevaPosicionX = event.layerX;
            nuevaPosicionY = event.layerY;
        } else {
            // Versión touch, pantalla táctil
            nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
            nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
        }
        // Guarda la linea
        guardarLinea();
        // Redibuja todas las lineas guardadas
        ctx.beginPath();
        lineas.forEach(function (segmento) {
            ctx.moveTo(segmento[0].x, segmento[0].y);
            segmento.forEach(function (punto, index) {
                ctx.lineTo(punto.x, punto.y);
            });
        });
        ctx.stroke();
    }
}
// Dibujar con el Teclado
function dibujarTeclado(parametro)
{
    let move = 1;
    switch(parametro.keyCode)
    {
        case teclas.UP:
            dibujarL(posX, posY, posX, posY - move, ctx);
            posY = posY - move;
        break;
        case teclas.DOWN:
            dibujarL(posX, posY, posX, posY + move, ctx);
            posY = posY + move;
        break;
        case teclas.LEFT:
            dibujarL(posX, posY, posX - move, posY, ctx);
            posX = posX - move;
        break;
        case teclas.RIGHT:
            dibujarL(posX, posY, posX + move, posY, ctx);
            posX = posX + move;
        break;
    }
}
function dibujarL(xinicial, yinicial, xfinal, yfinal, ctx)
{
    ctx.beginPath();
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.lineWidth = espesorSelect;
    ctx.strokeStyle = colorSelect;
    ctx.moveTo(xinicial,yinicial);
    ctx.lineTo(xfinal,yfinal);
    ctx.stroke();
    ctx.closePath();    
}
// Deja de dibujar la línea
function pararDibujar () {
    pintarLinea = false;
    guardarLinea();
}
// Borra la línea
function borrarTodo () {
    pintarLinea = false;
    ctx.clearRect(0, 0, miCanvas.width, miCanvas.height);
    lineas.length = 0;
}
// Cambiar color del fondo
function cambiarColorFondo() {
    let colorFondo = document.getElementById("button-color-fondo").value;
    document.getElementById("canvas-area").style.backgroundColor = colorFondo;
    console.log(colorFondo);
}
// Cambiar color de la línea
function cambiarColorLinea() {
    let colorSelectValue = document.getElementById("button-color-linea").value;
    colorSelect = colorSelectValue;
    console.log(colorSelectValue);
}
// Cambiar espesor de la línea
function cambiarEspesor() {
    let espesorSV = document.getElementById("list-thickness");
    espesorSelect = espesorSV.options[espesorSV.selectedIndex].value;
    console.log(espesorSelect);
}
//======================================================================
// EVENTOS
//======================================================================
// Eventos mouse
miCanvas.addEventListener('mousedown', empezarDibujo, false);
miCanvas.addEventListener('mousemove', dibujarLinea, false);
miCanvas.addEventListener('mouseup', pararDibujar, false);
// Eventos pantallas táctiles
miCanvas.addEventListener('touchstart', empezarDibujo, false);
miCanvas.addEventListener('touchmove', dibujarLinea, false);
// Eventos para borrar
limpiar.addEventListener('click', borrarTodo, false);
// Eventos teclas
document.addEventListener("keydown", dibujarTeclado, false);