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
    const pacienteID = document.getElementById('ID').value;

    const transaction = db.transaction(['consultasMedicas'], 'readwrite');
    const store = transaction.objectStore('consultasMedicas');
    const index = store.index('pacienteId');
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
            data.fecha = new Date().toISOString(); 

            const updateRequest = store.put(data); 

            updateRequest.onsuccess = function() {
                mostrarToastConsultaMedico();
                limpiarCampos();
                console.log("Consulta médica actualizada correctamente.");
            };

            updateRequest.onerror = function() {
                console.error("Error al actualizar la consulta médica:", updateRequest.error);
            };

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
    const store = transaction.objectStore('pacientes'); 
    const request = store.get(id);

    request.onsuccess = function(event) {
        const paciente = event.target.result;
        if (paciente) {
            paciente.medicamentosAlergicos = medicamentosAlergicos;
            paciente.enfermedades = enfermedades;

            const updateRequest = store.put(paciente);
            updateRequest.onsuccess = function() {
                mostrarToastConsultaMedico();
                limpiarCampos();
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
                mostrarToastConsultaMedico();
                limpiarCampos();
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


function mostrarToastConsultaMedico() {
    var toast = new bootstrap.Toast(document.getElementById('toastConsultaMedicoRealizada'));
    toast.show();
    setTimeout(function () {
        toast.hide();
    }, 3000);
}

//FUNCION PARA LIMPIAR LOS CAMPOS DEL FORMULARIO

function limpiarCampos() {
    document.getElementById('ID').value
    document.getElementById('medicamentosAlergicos').value = '';
    document.getElementById('enfermedades').value = '';
    document.getElementById('diagnostico').value = '';
    document.getElementById('medicamentos').value = '';
    document.getElementById('examenes').value = '';
}