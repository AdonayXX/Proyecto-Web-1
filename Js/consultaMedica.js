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

            store.add(consultaMedica).onsuccess = function() {
                console.log("Consulta médica guardada correctamente.");
            };

            store.add(consultaMedica).onerror = function(error) {
                console.error("Error al guardar la consulta médica:", error);
            };
        }
    };

    request.onerror = function() {
        console.error("Error al buscar la consulta médica por pacienteId.");
    };
});
