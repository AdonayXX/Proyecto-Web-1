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

    xhr.open("GET", "contentNationalInsurance.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}

function cargarContenidoPreventidos() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentPre-emptedpackages.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}

function cargarContenidoDeberesyDerechos() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentRightsduties.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}

function cargarContenidoParqueo() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentUseParking.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}

function cargarContenidoChequeos() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentCheckups.html", true);

   
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}

function cargarContenidoInstalaciones() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentFacilities.html", true);

   
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}
function cargarContenidoEquipo() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentMedical_Team.html", true);

   
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}
function cargarContenidoPlan() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentPlan_Includes.html", true);

   
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}
function cargarContenidoPlanCirugia() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentSurgeryPlans.html", true);

   
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}
function cargarContenidoPlanMeses() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "contentMonthPromotions.html", true);

   
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}



