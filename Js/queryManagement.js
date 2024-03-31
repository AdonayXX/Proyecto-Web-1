document.addEventListener('DOMContentLoaded', async function () {
    const fechaInput = document.getElementById('fecha');
    try {
        await openDatabase();
        await mostrarCitasPorFecha(fechaInput.value);
    } catch (error) {
        console.error('Error initializing IndexedDB:', error);
    }
    fechaInput.addEventListener('change', async function () {
        const nuevaFecha = fechaInput.value;
        await mostrarCitasPorFecha(nuevaFecha);

});
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




async function handleConsultas(citas) {
    const lista = document.getElementById('listaConsultas');
    for (let cita of citas) {
        try {
            const paciente = await obtenerPacientePorId(cita.pacienteId);
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `Cita el ${cita.fecha} a las ${cita.hora} con el doctor ${cita.doctor} - Paciente: ${paciente.nombre} ${paciente.apellidos}
            <button class="btn btn-primary btn-sm float-end hacer-consulta-btn" data-cita-id="${cita.id}">Hacer consulta</button>`;
            lista.appendChild(li);

            // Agregar evento de clic para el botón "Hacer Consulta"
            const hacerConsultaBtn = li.querySelector('.hacer-consulta-btn');
            hacerConsultaBtn.addEventListener('click', async () => {
                window.location.href = 'consultaMedica.html'; 
            });

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


async function mostrarCitasPorFecha(fecha) {
    const lista = document.getElementById('listaConsultas');
    lista.innerHTML = ''; 

    const transaction = db.transaction(['citas', 'pacientes'], 'readonly');
    const objectStore = transaction.objectStore('citas');
    const citas = [];

    objectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            if (cursor.value.fecha === fecha) { // Filtrar por fecha
                citas.push(cursor.value);
            }
            cursor.continue();
        } else {
            handleConsultas(citas);
  }
};
}

