document.getElementById('buscarPorPaciente').addEventListener('click', function () {
    cargarHistorialExamenesSangre();
    cargarHistorialExamenesOrina();
});

async function cargarHistorialExamenesSangre() {
    // Obtener el pacienteId ingresado
    let pacienteId = document.getElementById('pacienteId').value;

    // Abrir la base de datos IndexedDB
    let request = indexedDB.open('ClinicaDB');
    request.onsuccess = async function (event) {
        let db = event.target.result;

        // Iniciar una transacción para buscar el paciente por su ID
        let transaction = db.transaction(['pacientes'], 'readonly');
        let store = transaction.objectStore('pacientes');
        let pacienteRequest = store.get(pacienteId);

        pacienteRequest.onsuccess = function (event) {
            let paciente = event.target.result;
            if (paciente) {
                // Concatenar el nombre y los apellidos del paciente
                let nombreCompleto = `${paciente.nombre.toString()} ${paciente.apellidos.toString()}`;
                console.log(nombreCompleto);
                // Mostrar el nombre completo del paciente en el campo correspondiente
                document.getElementById('nombrePaciente').value = nombreCompleto;
            } else {
                // Limpiar el campo de nombre si no se encuentra el paciente
                document.getElementById('nombrePaciente').value = '';
            }
        };
        pacienteRequest.onerror = function (event) {
            console.error('Error al obtener la información del paciente:', event.target.error);
        };

        // Iniciar una transacción para buscar los exámenes de sangre del paciente
        let transactionExamenes = db.transaction(['examenesSangre'], 'readonly');
        let storeExamenes = transactionExamenes.objectStore('examenesSangre');
        let indexExamenes = storeExamenes.index('pacienteId');

        // Obtener todos los exámenes de sangre del paciente con el pacienteId
        let examenesSangreCursor = await indexExamenes.openCursor(IDBKeyRange.only(pacienteId));

        // Limpiar la tabla antes de cargar los nuevos datos
        let historialExamenSangre = document.getElementById('historialExamenSangre');
        historialExamenSangre.innerHTML = '';

        // Iterar sobre el cursor y agregar los exámenes de sangre a la tabla
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
    // Obtener el pacienteId ingresado
    let pacienteId = document.getElementById('pacienteId').value;

    // Abrir la base de datos IndexedDB
    let request = indexedDB.open('ClinicaDB');
    request.onsuccess = async function (event) {
        let db = event.target.result;

        // Iniciar una transacción para buscar el paciente por su ID
        let transaction = db.transaction(['pacientes'], 'readonly');
        let store = transaction.objectStore('pacientes');
        let pacienteRequest = store.get(pacienteId);

        pacienteRequest.onsuccess = function (event) {
            let paciente = event.target.result;
            if (paciente) {
                // Concatenar el nombre y los apellidos del paciente
                let nombreCompleto = `${paciente.nombre.toString()} ${paciente.apellidos.toString()}`;
                console.log(nombreCompleto);
                // Mostrar el nombre completo del paciente en el campo correspondiente
                document.getElementById('nombrePaciente').value = nombreCompleto;
            } else {
                // Limpiar el campo de nombre si no se encuentra el paciente
                document.getElementById('nombrePaciente').value = '';
            }
        };
        
        pacienteRequest.onerror = function (event) {
            console.error('Error al obtener la información del paciente:', event.target.error);
        };

        // Iniciar una transacción para buscar los exámenes de sangre del paciente
        let transactionExamenes = db.transaction(['examenesOrina'], 'readonly');
        let storeExamenes = transactionExamenes.objectStore('examenesOrina');
        let indexExamenes = storeExamenes.index('pacienteId');

        // Obtener todos los exámenes de sangre del paciente con el pacienteId
        let examenesSangreCursor = await indexExamenes.openCursor(IDBKeyRange.only(pacienteId));

        // Limpiar la tabla antes de cargar los nuevos datos
        let historialExamenSangre = document.getElementById('historialExamenOrina');
        historialExamenSangre.innerHTML = '';

        // Iterar sobre el cursor y agregar los exámenes de sangre a la tabla
        examenesSangreCursor.onsuccess = function (event) {
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
                historialExamenSangre.appendChild(fila);
                cursor.continue();
            }
        };
    };
    request.onerror = function (event) {
        console.error('Error al abrir la base de datos:', event.target.error);
    };
}
