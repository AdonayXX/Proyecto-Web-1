document.getElementById('btn-buscar-historial').addEventListener('click', function () {
    const pacienteId = document.getElementById('paciente-id').value;
    const consultaId = document.getElementById('consulta-id').value;
    if (consultaId) {
        buscarHistorialPorConsultaId(consultaId);
    } else
        if (pacienteId) {
            buscarHistorialPorPacienteId(pacienteId);
        }
});

function mostrarNombrePacientePorCedula(cedula) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['pacientes'], 'readonly');
        const store = transaction.objectStore('pacientes');
         const index = store.index('cedula');
        const request = store.get(cedula);

        request.onsuccess = function() {
            if (request.result) {
                resolve(request.result.nombre + ' ' + request.result.apellidos); 
            } else {
                resolve('Desconocido'); 
            }
        };

        request.onerror = function() {
            reject(new Error(`Error al obtener el nombre del paciente con cédula ${cedula}`));
        };
    });
}





function buscarHistorialPorPacienteId(pacienteId) {
    const transaction = db.transaction(['consultasMedicas'], 'readonly');
    const store = transaction.objectStore('consultasMedicas');
    const index = store.index('pacienteId');
    const request = index.getAll(IDBKeyRange.only(pacienteId));

    request.onsuccess = function () {
        const resultados = request.result;
        mostrarResultados(resultados);
    };

    request.onerror = function () {
        console.error('Error al buscar el historial del paciente con ID:', pacienteId);
    };
}
function buscarHistorialPorConsultaId(consultaId) {
    const transaction = db.transaction(['consultasMedicas'], 'readonly');
    const store = transaction.objectStore('consultasMedicas');
    const request = store.get(Number(consultaId));

    request.onsuccess = function () {
        const consulta = request.result;
        if (consulta) {
            mostrarResultados([consulta]);
        } else {
            console.log('No se encontró la consulta con ID:', consultaId);
        }
    };

    request.onerror = function () {
        console.error('Error al buscar la consulta con ID:', consultaId);
    };
}



async function mostrarResultados(resultados) {
    const tbody = document.getElementById('resultados-busqueda-historial');
    tbody.innerHTML = ''; 
    for (const consulta of resultados) {
        try {
            const nombrePaciente = await mostrarNombrePacientePorCedula(consulta.pacienteId);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${nombrePaciente}</td>
                <td>${consulta.fecha}</td>
                <td>${consulta.presion}</td>
                <td>${consulta.peso}</td>
                <td>${consulta.sintomas}</td>
                <td>${consulta.diagnostico}</td>
                <td>${consulta.medicamentos}</td>
                <td>${consulta.examenes}</td>
            `;
            tbody.appendChild(tr);
        } catch (error) {
            console.error(error);
        }
    }
}
//cargar dom
