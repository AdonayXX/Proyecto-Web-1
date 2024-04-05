
function cargarDatosPacientes() {
    let tablaPacientes = document.querySelector('.table-c tbody');

    tablaPacientes.innerHTML = '';

    let request = indexedDB.open('ClinicaDB');
    request.onsuccess = function (event) {
        let db = event.target.result;
        let transaction = db.transaction(['pacientes'], 'readonly');
        let store = transaction.objectStore('pacientes');

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

                let fechaNacimientoDate = new Date(fechaNacimiento);
                let hoy = new Date();
                let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
                let mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
                if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
                    edad--;
                }

                console.log('Peso:', peso);
                console.log('Altura:', altura);
                console.log('Enfermedades:', enfermedades);
                console.log('Medicamentos Alergicos:', medicamentosAlergicos);
                console.log('Edad:', edad);

                let edadElement = document.getElementById('edad');
                edadElement.textContent = edad; 
            } else {
                console.log('No se encontró la consulta médica para el paciente con ID:', idPaciente);
            }
        };
    };
}
window.onload = function () {
    cargarDatosPacientes();
    obtenerDatosConsultaMedica(idPaciente); 
};
