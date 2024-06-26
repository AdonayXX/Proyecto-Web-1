
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
        mostrarToastExamenSangreExistente();
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
            console.error('Error al agregar el examen de sangre:', error);
        };
    } catch (error) {
        console.error('Error al agregar el examen de sangre:', error);
    }
}

async function agregarExamenOrina() {
    let pacienteId = document.getElementById('pacienteIdOrina').value;
    let consultaId = parseInt(document.getElementById('consultaIdOrina').value);
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
        mostrarToastExamenOrinaExistente();
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
            mostrarToastExamenOrinaAgregadoCorrectamente() 
        };
        addRequest.onerror = function () {
            console.error('Error al agregar el examen de orina:', error);
        };
    } catch (error) {
        console.error('Error al agregar el examen de orina:', error);
    }
}

async function guardarTipoSangre() {
    let pacienteId = document.getElementById('pacienteId').value;
    let tipoSangre = document.getElementById('tipoSangre').value;

    try {
        let db = await abrirBaseDatos();
        let paciente = await obtenerPaciente(db, pacienteId);

        if (paciente) {
            paciente.tipoSangre = tipoSangre;

            let transaction = db.transaction(['pacientes'], 'readwrite');
            let store = transaction.objectStore('pacientes');
            
            let updateRequest = store.put(paciente);
            updateRequest.onsuccess = function () {
                console.log('Tipo de sangre actualizado correctamente');
            };
            updateRequest.onerror = function () {
                console.error('Error al actualizar el tipo de sangre');
            };
        } else {
            console.log('No se encontró al paciente con ID:', pacienteId);
        }
    } catch (error) {
        console.error('Error al guardar el tipo de sangre:', error);
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
        return false;
    }
}

async function verificarExistenciaConsulta(consultaId) {
    try {
        let db = await abrirBaseDatos();
        let consulta = await obtenerConsulta(db, consultaId);
        if (!consulta) {
            mostrarToastConsultaNoExiste();
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error al verificar la existencia de la consulta:', error);
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
        return false;
    }
}



// -----------------------------Eventos--------------------------------//

document.getElementById('agregarExamenSangre').addEventListener('click', function (event) {
    event.preventDefault(); 
    agregarExamenSangre();
    guardarTipoSangre();
});

document.getElementById('agregarExamenesOrina').addEventListener('click', function (event) {
    event.preventDefault(); 
    agregarExamenOrina();
});







// -----------------------------Toast--------------------------------//



function mostrarToastCamposObligatorios() {
    var toast = new bootstrap.Toast(document.getElementById('toastCamposObligatorios'));
    toast.show();
}

function mostrarToastExamenAgregadoCorrectamente() {
    var toast = new bootstrap.Toast(document.getElementById('toastExamenAgregadoCorrectamente'));
    toast.show();
}


function mostrarToastExamenOrinaAgregadoCorrectamente() {
    var toast = new bootstrap.Toast(document.getElementById('toastExamenOrinaAgregadoCorrectamente'));
    toast.show();
}


function mostrarToastPacienteNoExiste() {
    var toast = new bootstrap.Toast(document.getElementById('toastPacienteNoExiste'));
    toast.show();
}
function mostrarToastConsultaNoExiste() {
    var toast = new bootstrap.Toast(document.getElementById('toastConsultaNoExiste'));
    toast.show();
}


function mostrarToastExamenSangreExistente() {
    var toast = new bootstrap.Toast(document.getElementById('toastExamenSangreExistente'));
    toast.show();
}





function mostrarToastExamenOrinaExistente() {
    var toast = new bootstrap.Toast(document.getElementById('toastExamenOrinaExistente'));
    toast.show();
}





