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
    event.preventDefault(); // Evita el envío normal del formulario

    const pacienteID = document.getElementById('ID').value;
    const medicamentosAlergicos = document.getElementById('medicamentosAlergicos').value;
    const enfermedades = document.getElementById('enfermedades').value;
    const diagnostico = document.getElementById('diagnostico').value;
    const medicamentos = document.getElementById('medicamentos').value;
    const examenes = document.getElementById('examenes').value;

    const consultaMedica = {
        pacienteId: pacienteID,
        medicamentosAlergicos: medicamentosAlergicos,
        enfermedades: enfermedades,
        diagnostico: diagnostico,
        medicamentos: medicamentos,
        examenes: examenes,
        fecha: new Date().toISOString() // Agrega una marca de tiempo a la entrada
    };

    const transaction = db.transaction(['consultasMedicas'], 'readwrite');
    const store = transaction.objectStore('consultasMedicas');
    const request = store.add(consultaMedica);

    request.onsuccess = function() {
        console.log("Consulta médica guardada correctamente.");
        // Aquí puedes limpiar el formulario o dar feedback al usuario
    };

    request.onerror = function() {
        console.error("Error al guardar la consulta médica:", request.error);
        // Maneja los errores, por ejemplo, mostrando un mensaje al usuario
    };
});
