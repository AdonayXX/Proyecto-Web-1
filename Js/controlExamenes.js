
// -----------------------------Funciones--------------------------------//

async function agregarExamenSangre() {
    let pacienteId = document.getElementById('pacienteId').value;
    let consultaId = parseInt(document.getElementById('consultaId').value);
    let hemoglobina = document.getElementById('hemoglobina').value;
    let hematocrito = document.getElementById('hematocrito').value;
    let trigliceridos = document.getElementById('trigliceridos').value;
    let colesterolTotal = document.getElementById('colesterolTotal').value;
    let acidoUrico = document.getElementById('acidoUrico').value;
    let creatinina = document.getElementById('creatinina').value;

    if (!hemoglobina || !hematocrito || !trigliceridos || !colesterolTotal || !acidoUrico || !creatinina) {
        mostrarToastCamposObligatorios();
        return;
    }

    let pacienteExistente = await verificarExistenciaPaciente(pacienteId, consultaId);
    if (!pacienteExistente) return;

    let consultaExistente = await verificarExistenciaConsulta(consultaId);
    if (!consultaExistente) return;

    let examenSangreExistente = await verificarExistenciaExamenSangre(consultaId);
    if (examenSangreExistente) {
        alert('Ya existe un examen de sangre para esta consulta.');
        return;
    }

    try {
        let db = await abrirBaseDatos();

        let examenSangre = {
            pacienteId: pacienteId,
            consultaId: consultaId,
            hemoglobina: hemoglobina,
            hematocrito: hematocrito,
            trigliceridos: trigliceridos,
            colesterolTotal: colesterolTotal,
            acidoUrico: acidoUrico,
            creatinina: creatinina
        };

        let transaction = db.transaction(['examenesSangre'], 'readwrite');
        let store = transaction.objectStore('examenesSangre');

        let addRequest = store.add(examenSangre);
        addRequest.onsuccess = function () {
            mostrarToastExamenAgregadoCorrectamente();
        };
        addRequest.onerror = function () {
            mostrarToastErrorAgregarExamen();
        };
    } catch (error) {
        console.error('Error al agregar el examen de sangre:', error);
        mostrarToastErrorAgregarExamen();
    }
}

async function agregarExamenOrina() {
    let pacienteId = document.getElementById('pacienteId').value;
    let consultaId = parseInt(document.getElementById('consultaId').value);
    let glucosa = document.getElementById('glucosa').value;
    let eritrocitos = document.getElementById('eritrocitos').value;
    let color = document.getElementById('color').value;
    let leucocitos = document.getElementById('leucocitos').value;

    if (!glucosa || !eritrocitos || !color || !leucocitos) {
        mostrarToastCamposObligatorios();
        return;
    }

    let pacienteExistente = await verificarExistenciaPaciente(pacienteId, consultaId);
    if (!pacienteExistente) return;

    let consultaExistente = await verificarExistenciaConsulta(consultaId);
    if (!consultaExistente) return;

    let examenOrinaExistente = await verificarExistenciaExamenOrina(consultaId);
    if (examenOrinaExistente) {
        alert('Ya existe un examen de orina para esta consulta.');
        return;
    }

    try {
        let db = await abrirBaseDatos();

        let examenOrina = {
            pacienteId: pacienteId,
            consultaId: consultaId,
            glucosa: glucosa,
            eritrocitos: eritrocitos,
            color: color,
            leucocitos: leucocitos
        };

        let transaction = db.transaction(['examenesOrina'], 'readwrite');
        let store = transaction.objectStore('examenesOrina');

        let addRequest = store.add(examenOrina);
        addRequest.onsuccess = function () {
            mostrarToastExamenAgregadoCorrectamente();
        };
        addRequest.onerror = function () {
            mostrarToastErrorAgregarExamenOrina();
        };
    } catch (error) {
        console.error('Error al agregar el examen de orina:', error);
        mostrarToastErrorAgregarExamenOrina();
    }
}


// -----------------------------Base de Datos--------------------------------//

async function abrirBaseDatos() {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open('ClinicaDB');
        request.onsuccess = function (event) {
            resolve(event.target.result);
        };
        request.onerror = function (event) {
            reject('Error al abrir la base de datos');
        };
    });
}


// -----------------------------Obtener Datos--------------------------------//

async function obtenerPaciente(db, pacienteId) {
    return new Promise((resolve, reject) => {
        let pacienteTransaction = db.transaction(['pacientes'], 'readonly');
        let pacienteStore = pacienteTransaction.objectStore('pacientes');
        let pacienteRequest = pacienteStore.get(pacienteId);

        pacienteRequest.onsuccess = function (event) {
            resolve(event.target.result);
        };
        pacienteRequest.onerror = function (event) {
            reject('Error al obtener la información del paciente');
        };
    });
}

async function obtenerConsulta(db, consultaId) {
    return new Promise((resolve, reject) => {
        let consultaTransaction = db.transaction(['consultasMedicas'], 'readonly');
        let consultaStore = consultaTransaction.objectStore('consultasMedicas');
        let consultaRequest = consultaStore.get(consultaId);

        consultaRequest.onsuccess = function (event) {
            resolve(event.target.result);
        };
        consultaRequest.onerror = function (event) {
            reject('Error al obtener la consulta');
        };
    });
}



// -----------------------------Validaciones--------------------------------//

async function verificarExistenciaPaciente(pacienteId, consultaId) {
    try {
        let db = await abrirBaseDatos();
        let paciente = await obtenerPaciente(db, pacienteId);
        if (!paciente) {
            mostrarToastPacienteNoExiste();
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error al verificar la existencia del paciente:', error);
        mostrarToastErrorVerificarPaciente();
        return false;
    }
}

async function verificarExistenciaConsulta(consultaId) {
    try {
        let db = await abrirBaseDatos();
        let consulta = await obtenerConsulta(db, consultaId);
        if (!consulta) {
            alert('El ID de consulta proporcionado no está asociado a ninguna consulta en la base de datos.');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error al verificar la existencia de la consulta:', error);
        mostrarToastErrorObtenerConsulta();
        return false;
    }
}

async function verificarExistenciaExamenSangre(consultaId) {
    try {
        let db = await abrirBaseDatos();
        let examenSangreTransaction = db.transaction(['examenesSangre'], 'readonly');
        let examenSangreStore = examenSangreTransaction.objectStore('examenesSangre');
        let examenSangreIndex = examenSangreStore.index('consultaId');
        let examenSangreRequest = examenSangreIndex.getAll(consultaId);

        let examenesSangre = await new Promise((resolve, reject) => {
            examenSangreRequest.onsuccess = function (event) {
                resolve(event.target.result);
            };
            examenSangreRequest.onerror = function (event) {
                reject('Error al obtener los exámenes de sangre');
            };
        });

        return examenesSangre && examenesSangre.length > 0;
    } catch (error) {
        console.error('Error al verificar la existencia del examen de sangre:', error);
        mostrarToastErrorObtenerExamenSangre();
        return false;
    }
}

async function verificarExistenciaExamenOrina(consultaId) {
    try {
        let db = await abrirBaseDatos();
        let examenOrinaTransaction = db.transaction(['examenesOrina'], 'readonly');
        let examenOrinaStore = examenOrinaTransaction.objectStore('examenesOrina');
        let examenOrinaIndex = examenOrinaStore.index('consultaId');
        let examenOrinaRequest = examenOrinaIndex.getAll(consultaId);

        let examenesOrina = await new Promise((resolve, reject) => {
            examenOrinaRequest.onsuccess = function (event) {
                resolve(event.target.result);
            };
            examenOrinaRequest.onerror = function (event) {
                reject('Error al obtener los exámenes de orina');
            };
        });

        return examenesOrina && examenesOrina.length > 0;
    } catch (error) {
        console.error('Error al verificar la existencia del examen de orina:', error);
        mostrarToastErrorObtenerExamenOrina();
        return false;
    }
}



// -----------------------------Eventos--------------------------------//

document.getElementById('agregarExamenSangre').addEventListener('click', function (event) {
    event.preventDefault(); 
    agregarExamenSangre();
});

document.getElementById('agregarExamenOrina').addEventListener('click', function (event) {
    event.preventDefault(); 
    agregarExamenOrina();
});







// -----------------------------Toast--------------------------------//

function mostrarToastCamposObligatorios() {
    var toast = new bootstrap.Toast(document.getElementById('toastCamposObligatorios'));
    toast.show();
}

function mostrarToastPacienteNoExiste() {
    var toast = new bootstrap.Toast(document.getElementById('toastPacienteNoExiste'));
    toast.show();
}

function mostrarToastErrorObtenerPaciente() {
    var toast = new bootstrap.Toast(document.getElementById('toastErrorObtenerPaciente'));
    toast.show();
}

function mostrarToastErrorAbrirBD() {
    var toast = new bootstrap.Toast(document.getElementById('toastErrorAbrirBD'));
    toast.show();
}

function mostrarToastErrorVerificarPaciente() {
    var toast = new bootstrap.Toast(document.getElementById('toastErrorVerificarPaciente'));
    toast.show();
}

function mostrarToastErrorAgregarExamen() {
    var toast = new bootstrap.Toast(document.getElementById('toastErrorAgregarExamen'));
    toast.show();
}

function mostrarToastExamenAgregadoCorrectamente() {
    var toast = new bootstrap.Toast(document.getElementById('toastExamenAgregadoCorrectamente'));
    toast.show();
}
