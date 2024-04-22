document.getElementById('buscarForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const pacienteID = document.getElementById('Id-Buscar').value;

    limpiarConsultaAnterior();

    const transaction = db.transaction(['registrosPresionPeso'], 'readonly');
    const store = transaction.objectStore('registrosPresionPeso');
    const index = store.index('pacienteId');
    const request = index.openCursor(IDBKeyRange.only(pacienteID), 'prev');

    request.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
            const consulta = cursor.value;
            consulta.consultaId = cursor.primaryKey;
            mostrarConsulta(consulta);

            cursor.continue();
        }
    };

    request.onerror = function () {
        console.error("Error al buscar las consultas médicas por pacienteId.");
    };
});

function mostrarConsulta(consulta) {
    const cardDiv = document.querySelector('.card-body');
    const fechaFormateada = new Date(consulta.fechaHora).toLocaleString();
    const consultaHTML = `
        <div class="consulta">
        <h5 class="card-title-1" style="font-size: 15px; font-style: italic; margin-bottom:0px;">Fecha: ${fechaFormateada} | Consulta ID: ${consulta.consultaId}</h5>
            <p class="card-text" style=" margin-bottom:0px;">Presión: ${consulta.presion}</p>
            <p class="card-text">Peso: ${consulta.peso}</p>
            <hr>
        </div>
    `;
    cardDiv.insertAdjacentHTML('beforeend', consultaHTML);
}
function limpiarConsultaAnterior() {
    const cardDiv = document.querySelector('.card-body');
    const consultasAnteriores = cardDiv.querySelectorAll('.consulta');
    consultasAnteriores.forEach(consulta => {
        consulta.remove();
    });
}
