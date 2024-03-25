document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('doctor').addEventListener('change', cargarHorasDisponibles);
    document.getElementById('date').addEventListener('change', function() {
        cargarHorasDisponibles();
        verificarDiaSeleccionado(this); // Verifica si el día seleccionado es domingo
    });

    const inputFecha = document.getElementById('date');
    const fechaHoy = new Date().toISOString().split('T')[0];
    inputFecha.min = fechaHoy;

    document.getElementById('appointmentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        agendarCita();
        openDatabase();
    });
});

function verificarDiaSeleccionado(inputFecha) {
    const fechaSeleccionada = new Date(inputFecha.value);
    if (fechaSeleccionada.getDay() === 6) { // 0 es Domingo
        alert('Los domingos no están disponibles. Por favor, seleccione otra fecha.');
        inputFecha.value = ''; // Resetear la fecha
    }
}

function agendarCita() {
    const fechaCita = document.getElementById('date').value;
    const horaCita = document.getElementById('time').value; // Formato HH:MM
    if (!esFechaYHoraValida(fechaCita, horaCita)) {
        alert('Por favor, seleccione una fecha y hora válida para la cita. No se permiten citas en fechas pasadas ni los domingos.');
        return;
    }
    const cita = {
        nombre: document.getElementById('name').value,
        apellidos: document.getElementById('lastname').value,
        especialidad: document.getElementById('specialty').value,
        fecha: fechaCita,
        hora: horaCita,
        doctor: document.getElementById('doctor').value
    };

    const request = db.transaction(["citas"], "readwrite")
        .objectStore("citas")
        .add(cita);

    request.onsuccess = function() {
        showNotification('¡Su cita se ha agendado correctamente!');
    };

    request.onerror = function() {
        console.error('Error al agendar la cita', request.error);
        alert('Error al agendar la cita. Por favor, intente de nuevo.');
    };
}

function cargarHorasDisponibles() {
    // Asegúrate de que doctor y fecha están seleccionados
    const doctor = document.getElementById('doctor').value;
    const fecha = document.getElementById('date').value;
    if (!doctor || !fecha) return;

    let horasDisponibles = generarHorasDisponibles();
    let citasDelDia = [];

    const transaction = db.transaction(['citas'], 'readonly');
    const objectStore = transaction.objectStore('citas');
    const index = objectStore.index('doctorFecha');

    index.openCursor(IDBKeyRange.only([doctor, fecha])).onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            citasDelDia.push(cursor.value.hora);
            cursor.continue();
        } else {
            actualizarSelectHoras(filtrarHorasDisponibles(horasDisponibles, citasDelDia));
        }
    };
}

function generarHorasDisponibles() {
    let horas = [];
    for (let hora = 8; hora < 17; hora++) {
        horas.push(`${hora.toString().padStart(2, '0')}:00`);
        horas.push(`${hora.toString().padStart(2, '0')}:30`);
    }
    return horas;
}

function filtrarHorasDisponibles(horasDisponibles, citasDelDia) {
    return horasDisponibles.filter(hora => !citasDelDia.includes(hora));
}

function actualizarSelectHoras(horasDisponibles) {
    let selectHoras = document.getElementById('time');
    selectHoras.innerHTML = horasDisponibles.map(hora => `<option value="${hora}">${hora}</option>`).join('');
}

function showNotification(message) {
    let toastElement = document.getElementById('liveToast');
    let toastBody = toastElement.querySelector('.toast-body');
    toastBody.textContent = message;
    new bootstrap.Toast(toastElement).show();
}




function cargarEspecialidades() {
    let selectEspecialidades = document.getElementById('specialty'); 
    let transaction = db.transaction(['especialidades'], 'readonly');
    let objectStore = transaction.objectStore('especialidades');
    objectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            let option = document.createElement('option');
            option.value = cursor.value.nombre;
            option.text = cursor.value.nombre;
            selectEspecialidades.appendChild(option);
            cursor.continue();
        }
    };
}
function cargarDoctores() {
    let selectDoctores=document.getElementById('doctor');
    selectDoctores.innerHTML="";
    let transaction = db.transaction(['doctores'], 'readonly');
    let objectStore = transaction.objectStore('doctores');
    objectStore.openCursor().onsuccess=function(event){
        let cursor = event.target.result;
        if (cursor) {
            let option=document.createElement('option')
            option.value=cursor.value.nombre;
            option.text=cursor.value.nombre;
            selectDoctores.appendChild(option);
            cursor.continue();
        }
    }

}


// Cuando se selecciona una especialidad, carga los doctores correspondientes
document.getElementById('specialty').addEventListener('change', function(e) {
    const especialidadSeleccionada = e.target.value;
    cargarDoctoresPorEspecialidad(especialidadSeleccionada);
});
function cargarDoctoresPorEspecialidad(especialidad) {
    let selectDoctores = document.getElementById('doctor');
    selectDoctores.innerHTML = ""; // Limpia el select antes de cargar nuevos doctores

    // Añade la opción predeterminada "Seleccionar..." cada vez que se carga la lista de doctores.
    let opcionPredeterminada = document.createElement('option');
    opcionPredeterminada.textContent = "Seleccionar...";
    opcionPredeterminada.value = "";
    selectDoctores.appendChild(opcionPredeterminada);

    // Si no se ha seleccionado una especialidad o es la opción predeterminada, detiene la ejecución aquí.
    if (!especialidad || especialidad === "") {
        return;
    }

    let transaction = db.transaction(['doctores'], 'readonly');
    let objectStore = transaction.objectStore('doctores');
    let index = objectStore.index('especialidad');

    let request = index.openCursor(IDBKeyRange.only(especialidad));
    request.onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            let option = document.createElement('option');
            option.value = cursor.value.nombre;
            option.text = cursor.value.nombre;
            selectDoctores.appendChild(option);
            cursor.continue();
        }
    };
}
function esFechaYHoraValida(fechaCita, horaCita) {
    const ahora = new Date();
    const fechaHoraCita = new Date(`${fechaCita}T${horaCita}`);

    // Verificar que la cita no sea en el pasado
    if (fechaHoraCita < ahora) {
        return false;
    }

    // Verificar que no sea domingo (getDay() devuelve 0 para domingo)
    if (fechaHoraCita.getDay() === 0) {
        return false;
    }

    return true;
}
