document.addEventListener('DOMContentLoaded', function () {
    // Abre la base de datos cuando se carga el documento
    openDatabase();
}, false);

function openDatabase() {
    const request = indexedDB.open('ClinicaDB', 1);

    request.onerror = function (event) {
        console.error('IndexedDB error:', event.target.error);
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("Base de datos abierta exitosamente");
    };
}

document.getElementById('formularioConsulta').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío normal del formulario

    const pacienteID = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;
    const presion = document.getElementById('presion').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const sintomas = document.getElementById('sintomas').value;
    const fechaHora = new Date().toISOString();

    // Actualizar los datos del paciente
    actualizarPaciente(pacienteID, nombre, apellidos, edad);

    // Guardar la consulta médica
    guardarConsultaMedica(pacienteID, presion, peso, altura, sintomas);

    // Guardar registro de presión y peso
    guardarRegistroPresionPeso(pacienteID, fechaHora, presion, peso);
});

function actualizarPaciente(id, nombre, apellidos, edad) {
    const transaction = db.transaction(['pacientes'], 'readwrite');
    const store = transaction.objectStore('pacientes');
    const request = store.get(id);

    request.onsuccess = function (event) {
        const paciente = event.target.result;
        if (paciente) {
            paciente.nombre = nombre;
            paciente.apellidos = apellidos;
            paciente.edad = edad;
            store.put(paciente);
            console.log('Paciente actualizado correctamente.');
        } else {
            console.error('Paciente no encontrado');
        }
    };

    request.onerror = function (event) {
        console.error('Error al actualizar el paciente:', event.target.error);
    };
}

function guardarConsultaMedica(idPaciente, presion, peso, altura, sintomas) {
    const consultaMedica = {
        pacienteId: idPaciente,
        presion: presion,
        peso: peso,
        altura: altura,
        sintomas: sintomas,
        fecha: new Date().toISOString() // Agrega una marca de tiempo a la entrada
    };

    const transaction = db.transaction(['consultasMedicas'], 'readwrite');
    const store = transaction.objectStore('consultasMedicas');
    const request = store.add(consultaMedica);

    request.onsuccess = function () {
        console.log("Consulta médica guardada correctamente.");
        // Aquí puedes limpiar el formulario o dar feedback al usuario
    };

    request.onerror = function () {
        console.error("Error al guardar la consulta médica:", request.error);
        // Maneja los errores, por ejemplo, mostrando un mensaje al usuario
    };
}

function guardarRegistroPresionPeso(idPaciente, fechaHora, presion, peso) {
    const registroPresionPeso = {
        pacienteId: idPaciente,
        fechaHora: fechaHora,
        presion: presion,
        peso: peso
    };

    const transaction = db.transaction(['registrosPresionPeso'], 'readwrite');
    const store = transaction.objectStore('registrosPresionPeso');
    const request = store.add(registroPresionPeso);

    request.onsuccess = function () {
        console.log("Registro de presión y peso guardado correctamente.");
    };

    request.onerror = function () {
        console.error("Error al guardar el registro de presión y peso:", request.error);
    };
}