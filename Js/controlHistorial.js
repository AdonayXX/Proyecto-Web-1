// -----------------------------Eventos--------------------------------//

document.getElementById('buscarPorPaciente').addEventListener('click', function () {
    cargarHistorialExamenesSangre();
    cargarHistorialExamenesOrina();
});

async function cargarHistorialExamenesSangre() {
    let pacienteId = document.getElementById('pacienteId').value;

    let request = indexedDB.open('ClinicaDB');
    request.onsuccess = async function (event) {
        let db = event.target.result;

        let transaction = db.transaction(['pacientes'], 'readonly');
        let store = transaction.objectStore('pacientes');
        let pacienteRequest = store.get(pacienteId);

        pacienteRequest.onsuccess = function (event) {
            let paciente = event.target.result;
            if (paciente) {
                let nombreCompleto = `${paciente.nombre.toString()} ${paciente.apellidos.toString()}`;
                console.log(nombreCompleto);
                document.getElementById('nombrePaciente').value = nombreCompleto;
            } else {
                document.getElementById('nombrePaciente').value = '';
            }
        };
        pacienteRequest.onerror = function (event) {
            console.error('Error al obtener la información del paciente:', event.target.error);
        };

        let transactionExamenes = db.transaction(['examenesSangre'], 'readonly');
        let storeExamenes = transactionExamenes.objectStore('examenesSangre');
        let indexExamenes = storeExamenes.index('pacienteId');

        let examenesSangreCursor = await indexExamenes.openCursor(IDBKeyRange.only(pacienteId));

        let historialExamenSangre = document.getElementById('historialExamenSangre');
        historialExamenSangre.innerHTML = '';

        examenesSangreCursor.onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor) {
                let examen = cursor.value;
                let fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${examen.pacienteId}</td>
                    <td>${examen.consultaId}</td>
                    <td>${examen.hemoglobina}</td>
                    <td>${examen.hematocrito}</td>
                    <td>${examen.trigliceridos}</td>
                    <td>${examen.colesterolTotal}</td>
                    <td>${examen.acidoUrico}</td>
                    <td>${examen.creatinina}</td>
                `;
                historialExamenSangre.appendChild(fila);
                cursor.continue();
            }
        };
    };
    request.onerror = function (event) {
        console.error('Error al abrir la base de datos:', event.target.error);
    };
}

//------------------------------------------♡ Historial Examenes Orina ♡----------------------------------------------

async function cargarHistorialExamenesOrina() {
    let pacienteId = document.getElementById('pacienteId').value;

    let request = indexedDB.open('ClinicaDB');
    request.onsuccess = async function (event) {
        let db = event.target.result;

        let transaction = db.transaction(['pacientes'], 'readonly');
        let store = transaction.objectStore('pacientes');
        let pacienteRequest = store.get(pacienteId);

        pacienteRequest.onsuccess = function (event) {
            let paciente = event.target.result;
            if (paciente) {
                let nombreCompleto = `${paciente.nombre.toString()} ${paciente.apellidos.toString()}`;
                console.log(nombreCompleto);
                document.getElementById('nombrePaciente').value = nombreCompleto;
            } else {
                document.getElementById('nombrePaciente').value = '';
            }
        };
        pacienteRequest.onerror = function (event) {
            console.error('Error al obtener la información del paciente:', event.target.error);
        };

        let transactionExamenes = db.transaction(['examenesOrina'], 'readonly');
        let storeExamenes = transactionExamenes.objectStore('examenesOrina');
        let indexExamenes = storeExamenes.index('pacienteId');

        let examenesOrinaCursor = await indexExamenes.openCursor(IDBKeyRange.only(pacienteId));

        let historialExamenOrina = document.getElementById('historialExamenOrina');
        historialExamenOrina.innerHTML = '';

        examenesOrinaCursor.onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor) {
                let examen = cursor.value;
                let fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${examen.pacienteId}</td>
                    <td>${examen.consultaId}</td>
                    <td>${examen.glucosa}</td>
                    <td>${examen.eritrocitos}</td>
                    <td>${examen.color}</td>
                    <td>${examen.leucocitos}</td>
                `;
                historialExamenOrina.appendChild(fila);
                cursor.continue();
            }
        };
    };
    request.onerror = function (event) {
        console.error('Error al abrir la base de datos:', event.target.error);
    };
}
