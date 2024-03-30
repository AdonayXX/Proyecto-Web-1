document.addEventListener('DOMContentLoaded', async function () {
    try {
        await openDatabase();
        await mostrarCitasPendientes();
    } catch (error) {
        console.error('Error initializing IndexedDB:', error);
    }
});

async function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ClinicaDB', 1);

        request.onerror = function(event) {
            reject('IndexedDB error: ' + event.target.error);
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            resolve();
        };

        request.onupgradeneeded = function(event) {
            let db = event.target.result;
            // Considerar agregar aquí la creación de object stores si aún no existen
        };
    });
}

async function mostrarCitasPendientes() {
    const lista = document.getElementById('listaCitas');
    lista.innerHTML = ''; 

    const transaction = db.transaction(['citas', 'pacientes'], 'readonly');
    const objectStore = transaction.objectStore('citas');
    const citas = [];

    objectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            citas.push(cursor.value);
            cursor.continue();
        } else {
            handleCitas(citas);
        }
    };
}

async function handleCitas(citas) {
    const lista = document.getElementById('listaCitas');
    for (let cita of citas) {
        try {
            const paciente = await obtenerPacientePorId(cita.pacienteId);
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `Cita el ${cita.fecha} a las ${cita.hora} con el doctor ${cita.doctor} - Paciente: ${paciente.nombre} ${paciente.apellidos}
                <button class="btn btn-danger btn-sm float-end cancelar-cita-btn" data-cita-id="${cita.id}">Cancelar</button>`; 
            lista.appendChild(li);
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    }
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

        request.onerror = () => {
            reject('Error fetching patient by ID');
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

document.getElementById('confirmarCancelacionBtn').addEventListener('click', async function() {
    const citaId = this.getAttribute('data-cita-id');
    await cancelarCita(citaId);
    var modal = bootstrap.Modal.getInstance(document.getElementById('cancelarCitaModal'));
    modal.hide();
});

async function cancelarCita(citaId) {
    const transaction = db.transaction(['citas'], 'readwrite');
    const objectStore = transaction.objectStore('citas');
    const request = objectStore.delete(Number(citaId));

    request.onsuccess = async function() {
        console.log(`Cita con ID ${citaId} cancelada exitosamente.`);
        await mostrarCitasPendientes();
    };

    request.onerror = function(e) {
        console.error('Error al cancelar la cita:', e.target.error);
    };
}
