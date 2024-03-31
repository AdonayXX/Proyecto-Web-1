
document.getElementById('updatePresionForm').onsubmit = updatePresion;

function updatePresion(e) {
    e.preventDefault();
    const cedula = document.getElementById('updateCedula').value;
    const nuevaPresion = document.getElementById('updatePresion').value;

    const transaction = db.transaction(['pacientes'], 'readwrite');
    const store = transaction.objectStore('pacientes');
    const index = store.index('cedula');
    const request = index.get(cedula);

    request.onsuccess = function() {
        const paciente = request.result;
        if (paciente) {
            paciente.presion = nuevaPresion;
            store.put(paciente);
        } else {
            console.log('Paciente no encontrado');
        }
    };
}
