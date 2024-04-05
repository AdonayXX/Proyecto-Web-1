document.addEventListener('DOMContentLoaded', function() {
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

document.addEventListener('DOMContentLoaded', function() {
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
    const consultaId = document.getElementById('idConsulta').value; // Asegúrate de que este ID corresponde al campo en tu formulario

    const datosActualizados = {
        pacienteId: document.getElementById('ID').value, // Aunque no se actualiza, es útil para validación o referencia
        medicamentosAlergicos: document.getElementById('medicamentosAlergicos').value,
        enfermedades: document.getElementById('enfermedades').value,
        diagnostico: document.getElementById('diagnostico').value,
        medicamentos: document.getElementById('medicamentos').value,
        examenes: document.getElementById('examenes').value, // Asegúrate de que este campo se maneje correctamente dependiendo de cómo almacenas los datos
        fecha: new Date().toISOString()
    };

    actualizarConsultaMedica(consultaId, datosActualizados);
});

function actualizarConsultaMedica(consultaId, datosActualizados) {
    const transaction = db.transaction(['consultasMedicas'], 'readwrite');
    const store = transaction.objectStore('consultasMedicas');
    const request = store.get(Number(consultaId)); 
    request.onsuccess = function() {
        let data = request.result;
        if (data) {
            Object.assign(data, datosActualizados);
            const updateRequest = store.put(data); 
            updateRequest.onsuccess = function() {
                console.log("Consulta médica actualizada correctamente.");
            };
            updateRequest.onerror = function() {
                console.error("Error al actualizar la consulta médica:", updateRequest.error);
            };
        } else {
            console.log("Consulta médica no encontrada con ese ID.");
        }
    };

    request.onerror = function() {
        console.error("Error al buscar la consulta médica para actualizar.");
    };
}


// Función para actualizar los datos del paciente
function actualizarPaciente(id, enfermedades, medicamentosAlergicos) {
    const transaction = db.transaction(['pacientes'], 'readwrite');
    const store = transaction.objectStore('pacientes'); 
    const request = store.get(id);

    request.onsuccess = function(event) {
        const paciente = event.target.result;
        if (paciente) {
            paciente.medicamentosAlergicos = medicamentosAlergicos;
            paciente.enfermedades = enfermedades;

            const updateRequest = store.put(paciente);
            updateRequest.onsuccess = function() {
                console.log('Paciente actualizado correctamente.');
            };
            updateRequest.onerror = function(error) {
                console.error('Error al actualizar el paciente:', error);
            };
        } else {
            console.error('Paciente no encontrado');
        }
    };
    request.onerror = function(event) {
        console.error('Error al actualizar el paciente:', event.target.error);
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
            console.error('No se puede crear la consulta médica. Paciente no encontrado.');
        }
    };

    request.onerror = function(event) {
        console.error('Error al buscar el paciente:', event.target.error);
    };
}
