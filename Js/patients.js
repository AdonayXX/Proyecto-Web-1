// Función para cargar los datos de los pacientes en la tabla
function cargarDatosPacientes() {
    // Obtener la referencia a la tabla en HTML
    let tablaPacientes = document.querySelector('.table-c tbody');

    // Limpiar la tabla antes de cargar nuevos datos
    tablaPacientes.innerHTML = '';

    // Abrir la conexión a IndexedDB y obtener la transacción de lectura
    let request = indexedDB.open('ClinicaDB');
    request.onsuccess = function (event) {
        let db = event.target.result;
        let transaction = db.transaction(['pacientes'], 'readonly');
        let store = transaction.objectStore('pacientes');

        // Iterar sobre los datos de los pacientes y agregar filas a la tabla
        store.openCursor().onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor) {
                let paciente = cursor.value;
                let row = tablaPacientes.insertRow();
                row.innerHTML = `
                    <td>${paciente.cedula}</td>
                    <td>${paciente.nombre}</td>
                    <td>${paciente.apellidos}</td>
                    <td>${paciente.peso}</td>
                    <td>${paciente.edad}</td>
                    <td>${paciente.altura}</td>
                    <td>${paciente.enfermedades}</td>
                    <td>${paciente.tipoSangre}</td>
                    <td>${paciente.medicamentosAlergicos}</td>
                `;
                cursor.continue();
            }
        };
    };
}

// Función para obtener los datos de la consulta médica de un paciente por su ID
// Función para obtener los datos de la consulta médica de un paciente por su ID
function obtenerDatosConsultaMedica(idPaciente) {
    let request = indexedDB.open('ClinicaDB');
    request.onsuccess = function (event) {
        let db = event.target.result;
        let transaction = db.transaction(['consultasMedicas'], 'readonly');
        let store = transaction.objectStore('consultasMedicas');
        let index = store.index('pacienteId');

        let consultaRequest = index.get(idPaciente);
        consultaRequest.onsuccess = function (event) {
            let consultaMedica = event.target.result;
            if (consultaMedica) {
                let peso = consultaMedica.peso;
                let altura = consultaMedica.altura;
                let enfermedades = consultaMedica.enfermedades;
                let medicamentosAlergicos = consultaMedica.medicamentosAlergicos;
                let fechaNacimiento = consultaMedica.fechaNacimiento;

                // Calcular la edad a partir de la fecha de nacimiento
                let fechaNacimientoDate = new Date(fechaNacimiento);
                let hoy = new Date();
                let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
                let mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
                if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
                    edad--;
                }

                // Mostrar los datos en la interfaz
                console.log('Peso:', peso);
                console.log('Altura:', altura);
                console.log('Enfermedades:', enfermedades);
                console.log('Medicamentos Alergicos:', medicamentosAlergicos);
                console.log('Edad:', edad);

                // Puedes mostrar la edad en la interfaz de la manera que desees, por ejemplo:
                let edadElement = document.getElementById('edad');
                edadElement.textContent = edad; // Asumiendo que tienes un elemento con el ID 'edad' en tu HTML
            } else {
                console.log('No se encontró la consulta médica para el paciente con ID:', idPaciente);
            }
        };
    };
}

// Llamar a la función para cargar los datos de los pacientes al cargar la página
window.onload = function () {
    cargarDatosPacientes();
    obtenerDatosConsultaMedica(idPaciente); // Asegúrate de tener el ID del paciente aquí
};
