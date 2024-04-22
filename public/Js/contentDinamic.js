document.addEventListener("DOMContentLoaded", cargarContenidoInicio);

document.addEventListener("DOMContentLoaded", function () {
    const botonInicio = document.getElementById('boton-inicio');
    botonInicio.addEventListener("click", cargarContenidoInicio);
});

function cargarContenidoInicio() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/html/contentPrincipal.html", true);

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

    xhr.open("GET", "/html/contentServiceG.html", true);

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

    xhr.open("GET", "/html/contentSurgeries.html", true);

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

    xhr.open("GET", "/html/contentDirectory.html", true);

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

    xhr.open("GET", "/html/contentFotona.html", true);

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

    xhr.open("GET", "/html/contentProcedures.html", true);

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

    xhr.open("GET", "/html/contentMaternity.html", true);

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

    xhr.open("GET", "/html/contentConvenios.html", true);

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

    xhr.open("GET", "/html/contentNationalInsurance.html", true);

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

    xhr.open("GET", "/html/contentPre-emptedpackages.html", true);

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

    xhr.open("GET", "/html/contentRightsduties.html", true);

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

    xhr.open("GET", "/html/contentUseParking.html", true);

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

    xhr.open("GET", "/html/contentCheckups.html", true);

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

    xhr.open("GET", "/html/contentFacilities.html", true);

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

    xhr.open("GET", "/html/contentMedical_Team.html", true);

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

    xhr.open("GET", "/html/contentPlan_Includes.html", true);

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

    xhr.open("GET", "/html/contentSurgeryPlans.html", true);

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

    xhr.open("GET", "/html/contentMonthPromotions.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}

function cargarContenidoTac() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/html/contentTac.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}

function cargarContenidoVisitas() {
    var contenedor = document.getElementById("contenidoPrincipal");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/html/contentSpecialistVisits.html", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            contenedor.innerHTML = xhr.responseText;
            window.scrollTo(0, 0);
        }
    };
    xhr.send();
}
