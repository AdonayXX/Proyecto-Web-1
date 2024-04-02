

document.getElementById('form-especialidad').addEventListener('submit', function (e) {
    e.preventDefault();
    const especialidadVal = document.getElementById('nombre-especialidad').value;

    const transaction = db.transaction(['especialidades'], 'readwrite');
    const store = transaction.objectStore('especialidades');

    store.add({ nombre: especialidadVal });

    transaction.oncomplete = () => {
        console.log('Especialidad añadida');
        document.getElementById('nombre-especialidad').value = '';
        mostrarToastEspecialidadAgregada();
        cargarEspecialidades(); // Actualizar la lista de especialidades
    };
});
function cargarEspecialidades() {
    let selectEspecialidades = document.getElementById('especialidad-doctor');
    let listaEspecialidades = document.getElementById('lista-especialidades');
    selectEspecialidades.innerHTML = '';
    listaEspecialidades.innerHTML = '';

    const transaction = db.transaction(['especialidades'], 'readonly');
    const store = transaction.objectStore('especialidades');
    store.openCursor().onsuccess = function (e) {
        const cursor = e.target.result;
        if (cursor) {
            // Añade la especialidad al select
            let option = document.createElement('option');
            option.value = option.text = cursor.value.nombre;
            selectEspecialidades.add(option);

            // Y a la lista
            let li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = cursor.value.nombre;
            listaEspecialidades.appendChild(li);

            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.classList.add('btn', 'btn-danger', 'ms-2');
            btnEliminar.onclick = function () { deleteSpeciality(cursor.key); };

            li.appendChild(btnEliminar);
            cursor.continue();
        }
    };
}
document.getElementById('form-doctor').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombreDoctor = document.getElementById('nombre-doctor').value;
    const especialidadDoctor = document.getElementById('especialidad-doctor').value;

    const transaction = db.transaction(['doctores'], 'readwrite');
    const store = transaction.objectStore('doctores');

    const doctor = {
        nombre: nombreDoctor,
        especialidad: especialidadDoctor,
    };

    const request = store.add(doctor);

    request.onsuccess = () => {
        console.log('Doctor añadido con éxito');
        document.getElementById('nombre-doctor').value = '';
        mostrarToastDoctorAgregado();
        cargarDoctores();
    };

    request.onerror = (e) => {
        console.error('Error al añadir doctor', e.target.error);
    };
});


function cargarDoctores() {
    document.getElementById('lista-doctores').innerHTML = ''; // Limpia la lista actual

    const transaction = db.transaction(['doctores'], 'readonly');
    const store = transaction.objectStore('doctores');

    store.openCursor().onsuccess = function (e) {
        const cursor = e.target.result;
        if (cursor) {
            const doctor = cursor.value;
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${doctor.nombre} - Especialidad: ${doctor.especialidad}`;

            // Botón de eliminación
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.classList.add('btn', 'btn-danger', 'ms-2');
            btnEliminar.onclick = function () { eliminarDoctor(cursor.key); }; // Se usa cursor.key si el ID está en la clave primaria

            // Botón de edición
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.classList.add('btn', 'btn-secondary', 'ms-2');
            btnEditar.onclick = function () {
                editarDoctor(cursor.key);

            }; //Pendiente a hacer.


            li.appendChild(btnEditar);
            li.appendChild(btnEliminar);

            document.getElementById('lista-doctores').appendChild(li);

            cursor.continue();
        }
    };
}

function eliminarDoctor(doctorId) {
    const transaction = db.transaction(['doctores'], 'readwrite');
    const store = transaction.objectStore('doctores');
    store.delete(doctorId);

    transaction.oncomplete = () => {
        console.log('Doctor eliminado');
        cargarDoctores();

    };
}
function deleteSpeciality(especialityName) {
    const transaction = db.transaction(['especialidades'], 'readwrite');
    const store = transaction.objectStore('especialidades');
    store.delete(especialityName);

    transaction.oncomplete = () => {
        console.log('Especialidad Eliminada');
        cargarEspecialidades();
    }

}

function mostrarToastEspecialidadAgregada() {
    var toast = new bootstrap.Toast(document.getElementById('toastEspecialidadAgregada'));
    toast.show();
    setTimeout(function () {
        toast.hide();
    }, 3000);
}

function mostrarToastDoctorAgregado() {
    var toast = new bootstrap.Toast(document.getElementById('toastDoctorAgregado'));
    toast.show();
    setTimeout(function () {
        toast.hide();
    }, 3000);
}
