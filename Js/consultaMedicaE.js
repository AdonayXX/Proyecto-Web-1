let db;

document.addEventListener('DOMContentLoaded', function () {
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
    event.preventDefault();

    const pacienteID = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const fechaNacimiento = document.getElementById('edad').value;
    const presion = document.getElementById('presion').value;
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const sintomas = document.getElementById('sintomas').value;
    const fechaHora = new Date().toISOString();
    const edad = calcularEdad(fechaNacimiento);

    actualizarPaciente(pacienteID, nombre, apellidos, edad, peso, altura);

    guardarConsultaMedica(pacienteID, presion, peso, altura, sintomas);

    guardarRegistroPresionPeso(pacienteID, fechaHora, presion, peso);
});

function actualizarPaciente(id, nombre, apellidos, edad, peso, altura) {
    const transaction = db.transaction(['pacientes'], 'readwrite');
    const store = transaction.objectStore('pacientes');
    const request = store.get(id);

    request.onsuccess = function (event) {
        const paciente = event.target.result;
        if (paciente) {
            paciente.cedula = id;
            paciente.nombre = nombre;
            paciente.apellidos = apellidos;
            paciente.edad = edad;
            paciente.peso = peso;
            paciente.altura = altura;

            store.put(paciente);
            mostrarToastConsultaEnfermera();
            limpiarCampos();
            console.log('Paciente actualizado correctamente.');
        } else {
            console.error('Paciente no encontrado');
            const nuevoPaciente = {
                pacienteId: id,
                cedula: id,
                nombre: nombre,
                apellidos: apellidos,
                edad: edad,
                peso: peso,
                altura: altura
            };

            const addRequest = store.add(nuevoPaciente);
            addRequest.onsuccess = function () {
                console.log('Nuevo paciente agregado correctamente.');
            };
            addRequest.onerror = function () {
                console.error('Error al agregar nuevo paciente:', addRequest.error);
            };
        }
    };

    request.onerror = function (event) {
        console.error('Error al actualizar el paciente:', event.target.error);
    };
}

function guardarConsultaMedica(idPaciente, presion, peso, altura, sintomas) {
    const transaction = db.transaction(['consultasMedicas'], 'readwrite');
    const store = transaction.objectStore('consultasMedicas');
    const index = store.index('pacienteId');
    const request = index.openCursor(IDBKeyRange.only(idPaciente));

    request.onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            const consulta = cursor.value;
            consulta.presion = presion;
            consulta.peso = peso;
            consulta.altura = altura;
            consulta.sintomas = sintomas;

            cursor.update(consulta);
            console.log("Consulta médica actualizada correctamente.");
        } else {
            const nuevaConsulta = {
                pacienteId: idPaciente,
                presion: presion,
                peso: peso,
                altura: altura,
                sintomas: sintomas,
                fecha: new Date().toISOString()
            };
            store.add(nuevaConsulta);
            mostrarToastConsultaEnfermera();
            limpiarCampos();

            console.log("Nueva consulta médica creada.");
        }
    };

    request.onerror = function() {
        console.error("Error al buscar la consulta médica:", request.error);
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

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}


function limpiarCampos() {
    document.getElementById('cedula').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellidos').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('presion').value = '';
    document.getElementById('peso').value = '';
    document.getElementById('altura').value = '';
    document.getElementById('sintomas').value = '';
}

function mostrarToastConsultaEnfermera() {
    var toast = new bootstrap.Toast(document.getElementById('toastConsultaRealizada'));
    toast.show();
    setTimeout(function () {
        toast.hide();
    }, 3000);
}
