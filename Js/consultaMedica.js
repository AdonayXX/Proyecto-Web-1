document.addEventListener('DOMContentLoaded', function() {
    // Abre la base de datos cuando se carga el documento
    openDatabase();
}, false);

function openDatabase() {
    const request = indexedDB.open('ClinicaDB', 1);

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.error);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Base de datos abierta exitosamente");
    };
}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const pacienteID = document.getElementById('ID').value;

    // Inicia la transacción y obtiene el almacén de objetos
    const transaction = db.transaction(['consultasMedicas'], 'readwrite');
    const store = transaction.objectStore('consultasMedicas');
    const index = store.index('pacienteId'); // Asume que has creado este índice en tu almacén
    const request = index.get(pacienteID);

    request.onsuccess = function() {
        let data = request.result;

        // Si existe una entrada para este paciente, actualiza la información
        if(data) {
            data.medicamentosAlergicos = document.getElementById('medicamentosAlergicos').value;
            data.enfermedades = document.getElementById('enfermedades').value;
            data.diagnostico = document.getElementById('diagnostico').value;
            data.medicamentos = document.getElementById('medicamentos').value;
            data.examenes = document.getElementById('examenes').value;
            data.fecha = new Date().toISOString(); // Actualiza la fecha de la consulta

            const updateRequest = store.put(data); // Intenta actualizar la entrada

            updateRequest.onsuccess = function() {
                console.log("Consulta médica actualizada correctamente.");
            };

            updateRequest.onerror = function() {
                console.error("Error al actualizar la consulta médica:", updateRequest.error);
            };

            // Llama a la función para actualizar también los datos del paciente
            actualizarPaciente(pacienteID, data.enfermedades, data.medicamentosAlergicos);
        } else {
            // Si no existe, crea una nueva entrada
            const consultaMedica = {
                pacienteId: pacienteID,
                medicamentosAlergicos: document.getElementById('medicamentosAlergicos').value,
                enfermedades: document.getElementById('enfermedades').value,
                diagnostico: document.getElementById('diagnostico').value,
                medicamentos: document.getElementById('medicamentos').value,
                examenes: document.getElementById('examenes').value,
                fecha: new Date().toISOString()
            };

            // Verifica si el paciente existe antes de guardar la consulta médica
            guardarConsultaMedica(pacienteID, consultaMedica);
        }
    };

    request.onerror = function() {
        console.error("Error al buscar la consulta médica por pacienteId.");
    };
});

// Función para actualizar los datos del paciente
function actualizarPaciente(id, enfermedades, medicamentosAlergicos) {
    const transaction = db.transaction(['pacientes'], 'readwrite');
    const request = store.get(id);
    const store = transaction.objectStore('pacientes');
    request.onsuccess = function (event) {

        const paciente = event.target.result;
        if (paciente) {
            paciente.medicamentosAlergicos = medicamentosAlergicos;
            paciente.enfermedades = enfermedades;

                console.log('Paciente actualizado correctamente.');
            store.put(paciente).onsuccess = function () {
            };
            store.put(paciente).onerror = function (error) {

                console.error('Error al actualizar el paciente:', error);
            };
        } else {
        }
            console.error('Paciente no encontrado');

    };
        console.error('Error al actualizar el paciente:', event.target.error);
    request.onerror = function (event) {
    };
}

// Función para guardar la consulta médica
function guardarConsultaMedica(pacienteID, consultaMedica) {
    const transaction = db.transaction(['pacientes'], 'readonly');
    const store = transaction.objectStore('pacientes');
    const request = store.get(pacienteID);

    request.onsuccess = function(event) {
        const paciente = event.target.result;
        if (paciente) {
            // El paciente existe, puedes guardar la consulta médica aquí
            const transactionConsulta = db.transaction(['consultasMedicas'], 'readwrite');
            const storeConsulta = transactionConsulta.objectStore('consultasMedicas');
            const addRequest = storeConsulta.add(consultaMedica);

            addRequest.onsuccess = function() {
                console.log('Consulta médica guardada correctamente.');
            };

            addRequest.onerror = function(event) {
                console.error('Error al guardar la consulta médica:', event.target.error);
            };
        } else {
            // El paciente no existe, muestra un mensaje de error
            console.error('No se puede crear la consulta médica. Paciente no encontrado.');
        }
    };

    request.onerror = function(event) {
        console.error('Error al buscar el paciente:', event.target.error);
    };
}
