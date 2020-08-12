'use strict'

function cambiarFormato(fecha) {
    return fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
}

function obtenerEdad(newUsuario) {
    let fechaInput = newUsuario.get('fecha');
    let nacimiento = new Date(fechaInput);
    let fechaActual = new Date();

    nacimiento.setDate(nacimiento.getDate() + 1);

    let anos = fechaActual.getFullYear() - nacimiento.getFullYear();
    let meses = fechaActual.getMonth() - nacimiento.getMonth();

    if (meses == 0 && fechaActual.getDate() < nacimiento.getDate()) {
        anos--;
    }

    return anos;
}

function printDiv() {
    var contenido = document.getElementById('contenedorUs').innerHTML;
    var contenidoOriginal = document.body.innerHTML;

    document.body.innerHTML = contenido;

    window.print();

    document.body.innerHTML = contenidoOriginal;
}

function mostrarDatos(newUsuario) {

    var peliculasMayores = [
        'Pelicula A',
        'Pelicula B',
        'Pelicula C'
    ];

    var peliculasTodos = [
        'Pelicuala 1',
        'Pelicula 2',
        'Pelicula 3'
    ];

    let datosUsuario = document.getElementById('contenedorUs');

    datosUsuario.innerHTML = '';

    if (obtenerEdad(newUsuario) >= 18) {

        datosUsuario.innerHTML = `
            <div class="usuario">
                <p>${newUsuario.get('nombre')}</p>
            </div>
            <div class="peliculas">
                <h2>Acceso a:</h2>
                <p>${peliculasMayores[0]}</p>
                <p>${peliculasMayores[1]}</p>
                <p>${peliculasMayores[2]}</p>
                <p>${peliculasTodos[0]}</p>
                <p>${peliculasTodos[1]}</p>
                <p>${peliculasTodos[2]}</p>
            </div>
            <div class="botonImprimir" id="b" onclick="printDiv()">
                <button class="imprimir">
                    <p>Imprimir</p>
                </button>
            </div>
        `

    } else {

        datosUsuario.innerHTML = `
            <div class="usuario">
                <p>${newUsuario.get('nombre')}</p>
            </div>
            <div class="peliculas">
                <h2>Acceso a:</h2>
                <p>${peliculasTodos[0]}</p>
                <p>${peliculasTodos[1]}</p>
                <p>${peliculasTodos[2]}</p>
            </div>
            <div class="botonImprimir" id="b">
                <button class="imprimir" id="imp" onclick="printDiv()">
                    <p>Imprimir</p>
                </button>
            </div>
        `
    }
}

window.addEventListener('load', function() {
    console.log("Pagina cargada");

    let formulario = document.getElementById('nuevoUsuario');

    formulario.addEventListener('submit', function(e) {
        console.log("Se preciono boton de nuevo usuario");
        e.preventDefault();

        let newUsuario = new FormData(formulario);

        mostrarDatos(newUsuario);
        formulario.reset();
    })
})