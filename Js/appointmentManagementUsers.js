var db; 

document.addEventListener('DOMContentLoaded', function () {
    openDatabase().then(() => {
        mostrarCitasPendientes();
    }).catch(error => {
        console.error('Error initializing IndexedDB:', error);
    });
});

async function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ClinicaDB', 1); 
        
        request.onerror = function(event) {
            console.error('IndexedDB error:', event.target.error);
            reject(event.target.error);
        };
        
        request.onsuccess = function(event) {
            db = event.target.result;
            resolve();
        };
        
        request.onupgradeneeded = function(event) {
            let db = event.target.result;
        };
    });
}

async function mostrarCitasPendientes() {
    const lista = document.getElementById('listaCitas');
    lista.innerHTML = ''; 

    let transaction = db.transaction(['citas', 'pacientes'], 'readonly');
    let objectStore = transaction.objectStore('citas');

    objectStore.openCursor().onsuccess = async function(event) {
        let cursor = event.target.result;
        if (cursor) {
            const cita = cursor.value;
            const paciente = await obtenerPacientePorId(cita.pacienteId);
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `Cita el ${cita.fecha} a las ${cita.hora} con el doctor ${cita.doctor} - Paciente: ${paciente.nombre} ${paciente.apellidos}
                <button class="btn btn-danger btn-sm float-end cancelar-cita-btn" data-cita-id="${cursor.key}">Cancelar</button>`;
            lista.appendChild(li);
            cursor.continue();
        }
    };
}


async function obtenerPacientePorId(pacienteId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['pacientes'], 'readonly');
        const store = transaction.objectStore('pacientes');
        const request = store.get(pacienteId); 

        request.onsuccess = () => {
            if (request.result) {
                resolve(request.result);
            } else {
                reject('Paciente no encontrado');
            }
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cancelar-cita-btn')) {
        const citaId = e.target.getAttribute('data-cita-id');
        document.getElementById('confirmarCancelacionBtn').setAttribute('data-cita-id', citaId);
        
        // Mostrar el modal de Bootstrap
        var modal = new bootstrap.Modal(document.getElementById('cancelarCitaModal'));
        modal.show();
    }
});

document.getElementById('confirmarCancelacionBtn').addEventListener('click', function() {
    const citaId = this.getAttribute('data-cita-id');
    cancelarCita(citaId);
    var modal = bootstrap.Modal.getInstance(document.getElementById('cancelarCitaModal'));
    modal.hide();
});
function cancelarCita(citaId) {
    const transaction = db.transaction(['citas'], 'readwrite'); 
    const objectStore = transaction.objectStore('citas');


    const request = objectStore.delete(Number(citaId)); 

    request.onsuccess = function() {
        console.log(`Cita con ID ${citaId} cancelada exitosamente.`);
        mostrarCitasPendientes(); 
    };

    request.onerror = function(e) {
        console.error('Error al cancelar la cita:', e.target.error);
        
    };
}
