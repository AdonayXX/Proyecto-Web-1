document.addEventListener("DOMContentLoaded", cargarContenidoInicio);

document.addEventListener("DOMContentLoaded", function () {
    const botonInicio = document.getElementById('boton-inicio');
    botonInicio.addEventListener("click", cargarContenidoInicio);

   
});
function cargarContenidoInicio() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentPrincipal.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}


function cargarContenidoServicios() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentServiceG.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}
function cargarContenidoCirugias() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentSurgeries.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}
function cargarContenidoDirectorio() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentDirectory.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}
function cargarContenidoFotona() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentFotona.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}
function cargarContenidoProcedimientos() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentProcedures.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}
function cargarContenidoMaternidad() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentMaternity.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}

function cargarContenidoConvenios() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentConvenios.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}
function cargarContenidoSeguros() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "nationalInsurance.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}

