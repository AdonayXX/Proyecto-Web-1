
//----------------------------------------- AgregarExamenesdeSangre -----------------------------------------//
function agregarExamenSangre() {
    let pacienteId = document.getElementById('pacienteId').value;
    let consultaId = document.getElementById('consultaId').value;
    let hemoglobina = document.getElementById('hemoglobina').value;
    let hematocrito = document.getElementById('hematocrito').value;
    let trigliceridos = document.getElementById('trigliceridos').value;
    let colesterolTotal = document.getElementById('colesterolTotal').value;
    let acidoUrico = document.getElementById('acidoUrico').value;
    let creatinina = document.getElementById('creatinina').value;

    // Verificar si los campos obligatorios están llenos
    if (!pacienteId || !consultaId || !hemoglobina || !hematocrito || !trigliceridos || !colesterolTotal || !acidoUrico || !creatinina) {
        alert('Todos los campos son obligatorios. Por favor, complete todos los campos.');
        return; // Detener la ejecución si hay campos vacíos
    }

    // Crear el objeto del examen de sangre con los datos proporcionados
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

    // Abrir la base de datos IndexedDB
    let request = indexedDB.open('ClinicaDB');
    request.onsuccess = function (event) {
        let db = event.target.result;
        let transaction = db.transaction(['examenesSangre'], 'readwrite');
        let store = transaction.objectStore('examenesSangre');

        // Agregar el examen de sangre al almacén
        let addRequest = store.add(examenSangre);
        addRequest.onsuccess = function () {
            console.log('Examen de sangre agregado correctamente');
            // Aquí puedes realizar cualquier acción adicional después de agregar el examen de sangre, como cargar datos o mostrar un mensaje de éxito.
        };
        addRequest.onerror = function () {
            console.error('Error al agregar el examen de sangre');
        };
    };
    request.onerror = function (event) {
        console.error('Error al abrir la base de datos:', event.target.error);
    };
}

document.getElementById('agregarExamenSangre').addEventListener('click', function () {
    agregarExamenSangre();
});

function verificarExistenciaPacienteConsulta(idPaciente, idConsulta) {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open('ClinicaDB');
        request.onsuccess = function (event) {
            let db = event.target.result;
            let transaction = db.transaction(['pacientes', 'consultas'], 'readonly');
            let pacientesStore = transaction.objectStore('pacientes');
            let consultasStore = transaction.objectStore('consultas');

            let pacienteRequest = pacientesStore.get(idPaciente);
            let consultaRequest = consultasStore.get(idConsulta);

            let pacienteEncontrado = false;
            let consultaEncontrada = false;

            pacienteRequest.onsuccess = function (event) {
                let paciente = event.target.result;
                if (paciente) {
                    pacienteEncontrado = true;
                }
                if (pacienteEncontrado && consultaEncontrada) {
                    resolve(true);
                }
            };
            pacienteRequest.onerror = function (event) {
                console.log('Error al obtener la información del paciente:', event.target.error);
                reject(event.target.error);
            };

            consultaRequest.onsuccess = function (event) {
                let consulta = event.target.result;
                if (consulta) {
                    consultaEncontrada = true;
                }
                if (pacienteEncontrado && consultaEncontrada) {
                    resolve(true);
                }
            };
            consultaRequest.onerror = function (event) {
                console.log('Error al obtener la información de la consulta:', event.target.error);
                reject(event.target.error);
            };
        };
        request.onerror = function (event) {
            console.log('Error al abrir la base de datos:', event.target.error);
            reject(event.target.error);
        };
    });
}
