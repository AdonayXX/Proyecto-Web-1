
//----------------------------------------- AgregarPacientes -----------------------------------------//

function agregarPaciente() {
    
    let id = document.getElementById('identificacion').value;
    let nombre = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellido').value;
    let peso = document.getElementById('peso').value;
    let fechaNacimiento = document.getElementById('edad').value;
    let altura = document.getElementById('altura').value;
    let enfermedades = document.getElementById('enfermedades').value;
    let tipoSangre = document.getElementById('tipoSangre').value;
    let medicamentosAlergicos = document.getElementById('alergias').value;

    if (!id || !nombre || !apellidos || !peso || !fechaNacimiento || !altura || !enfermedades || !tipoSangre || !medicamentosAlergicos) {
        mostrarToastCompleteDatos();
        return  ;
    }
    let edad = calcularEdad(fechaNacimiento);

    let paciente = {
        pacienteId: id,
        cedula: id,
        nombre: nombre,
        apellidos: apellidos,
        edad: edad,
        peso: peso,
        altura: altura,
        enfermedades: enfermedades,
        tipoSangre: tipoSangre,
        medicamentosAlergicos: medicamentosAlergicos
    };

    let request = indexedDB.open('ClinicaDB');
    request.onsuccess = function (event) {
        let db = event.target.result;
        let transaction = db.transaction(['pacientes'], 'readwrite');
        let store = transaction.objectStore('pacientes');

        let addRequest = store.add(paciente);
        addRequest.onsuccess = function () {
            console.log('Paciente agregado correctamente');
            cargarDatosPacientes();
            mostrarToastPacienteAgregado();
            mostrarModalSelectFamiliar();



            };
            addRequest.onerror = function () {
                console.error('Error al agregar al paciente');
            };
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


    document.getElementById('AgregarPacienteBtn').addEventListener('click', function () {
        agregarPaciente();
        limpiarAgregarPacienteModal();
    });



    //----------------------------------------- Eliminar Paciente -----------------------------------------//

    function eliminarPaciente(idPaciente) {
        let request = indexedDB.open('ClinicaDB');
        request.onsuccess = function (event) {
            let db = event.target.result;
            let transaction = db.transaction(['pacientes'], 'readwrite');
            let store = transaction.objectStore('pacientes');

            let deleteRequest = store.delete(idPaciente);
            deleteRequest.onsuccess = function () {
                console.log('Paciente eliminado correctamente');
                cargarDatosPacientes();
                cerrarModal('eliminarPacienteModal');
                mostrarToastPacienteEliminado();
            };
            deleteRequest.onerror = function () {
                console.error('Error al eliminar al paciente');
            };
        };
    }

    document.getElementById('eliminarPacienteBtn').addEventListener('click', function () {
        var idPacienteEliminar = document.getElementById('idPacienteEliminar').value;

        eliminarPaciente(idPacienteEliminar);
        limpiarElimarPacienteModal();
    });


    //----------------------------------------- Actualizar Paciente -----------------------------------------//

    document.getElementById('actualizarPacienteBtnModal').addEventListener('click', function () {
        let idPacienteEditar = document.getElementById('idPacienteEditar').value;


        let pacienteActualizado = {
            cedula: document.getElementById('identificacionEditar').value,
            nombre: document.getElementById('nombreEditar').value,
            apellidos: document.getElementById('apellidoEditar').value,
            peso: document.getElementById('pesoEditar').value,
            edad: document.getElementById('edadEditar').value,
            altura: document.getElementById('alturaEditar').value,
            enfermedades: document.getElementById('enfermedadesEditar').value,
            tipoSangre: document.getElementById('tipoSangreEditar').value,
            medicamentosAlergicos: document.getElementById('alergiasEditar').value
        };

        actualizarPaciente(idPacienteEditar, pacienteActualizado);
    });


    function actualizarPaciente(idPaciente, datosActualizados) {
        let request = indexedDB.open('ClinicaDB');
        request.onsuccess = function (event) {
            let db = event.target.result;
            let transaction = db.transaction(['pacientes'], 'readwrite');
            let store = transaction.objectStore('pacientes');

            let getRequest = store.get(idPaciente);
            getRequest.onsuccess = function (event) {
                let paciente = event.target.result;
                if (paciente) {
                    Object.assign(paciente, datosActualizados);

                    let updateRequest = store.put(paciente);
                    updateRequest.onsuccess = function () {
                        console.log('Paciente actualizado correctamente');
                        cargarDatosPacientes();
                        limpiarEditarIdPaciente();
                        cerrarModal('editarPacienteForm');
                        mostrarToastPacienteActualizado();
                    };
                    updateRequest.onerror = function () {
                        console.error('Error al actualizar al paciente');
                    };
                } else {
                    console.log('No se encontró al paciente con ID:', idPaciente);
                }
            };
            getRequest.onerror = function () {
                console.error('Error al obtener al paciente para actualizar');
            };
        };
        request.onerror = function (event) {
            console.log('Error al abrir la base de datos:', event.target.error);
        };
    }




    //----------------------------------------- Buscar Paciente -----------------------------------------//

    document.getElementById('buscarPacienteBtn').addEventListener('click', function () {
        let idPacienteEditar = document.getElementById('idPacienteEditar').value;

        obtenerInformacionPaciente(idPacienteEditar)
            .then(paciente => {
                if (paciente) {
                    document.getElementById('identificacionEditar').value = paciente.cedula;
                    document.getElementById('nombreEditar').value = paciente.nombre;
                    document.getElementById('apellidoEditar').value = paciente.apellidos;
                    document.getElementById('pesoEditar').value = paciente.peso;
                    document.getElementById('edadEditar').value = paciente.edad;
                    document.getElementById('alturaEditar').value = paciente.altura;
                    document.getElementById('tipoSangreEditar').value = paciente.tipoSangre;
                    document.getElementById('enfermedadesEditar').value = paciente.enfermedades;
                    document.getElementById('alergiasEditar').value = paciente.medicamentosAlergicos;


                    var editarPacienteForm = new bootstrap.Modal(document.getElementById('editarPacienteForm'));
                    editarPacienteForm.show();
                    cerrarModal('editarPacienteModal');


                } else {
                    mostrarToastPacienteNoEncontrado();
                }
            })
            .catch(error => {
                console.log('Error al obtener la información del paciente:', error);
                alert('Error al obtener la información del paciente');
            });
    });


    function obtenerInformacionPaciente(idPaciente) {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open('ClinicaDB');
            request.onsuccess = function (event) {
                let db = event.target.result;
                let transaction = db.transaction(['pacientes'], 'readonly');
                let store = transaction.objectStore('pacientes');
                let pacienteRequest = store.get(idPaciente);

                pacienteRequest.onsuccess = function (event) {
                    let paciente = event.target.result;
                    if (paciente) {
                        resolve(paciente);
                    } else {
                        console.log('No se encontró al paciente con ID:', idPaciente);
                        resolve(null);
                    }
                };
                pacienteRequest.onerror = function (event) {
                    console.log('Error al obtener la información del paciente:', event.target.error);
                    reject(event.target.error);
                };
            };
            request.onerror = function (event) {
                console.log('Error al abrir la base de datos:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    function buscarPaciente() {
        let idPacienteBuscar = document.getElementById('idPacienteBuscar').value;

        obtenerInformacionPaciente(idPacienteBuscar)
            .then(paciente => {
                if (paciente) {
                    let tablaPacientes = document.querySelector('.table-c table tbody');
                    tablaPacientes.innerHTML = `
                    <tr>
                        <td>${paciente.cedula}</td>
                        <td>${paciente.nombre}</td>
                        <td>${paciente.apellidos}</td>
                        <td>${paciente.peso}</td>
                        <td>${paciente.edad}</td>
                        <td>${paciente.altura}</td>
                        <td>${paciente.enfermedades}</td>
                        <td>${paciente.tipoSangre}</td>
                        <td>${paciente.medicamentosAlergicos}</td>
                    </tr>
                `;
                    cerrarModal('buscarPacienteModal');
                    limpiarbuscarPacienteModal();
                    mostrarToastPacienteEncontrado();
                } else {
                    mostrarToastPacienteNoEncontrado();
                }
            })
            .catch(error => {
                console.log('Error al obtener la información del paciente:', error);
                alert('Error al obtener la información del paciente');
            });
    }


    function llenarTablaPaciente(paciente) {
        let tablaPacientes = document.getElementById('tablaPacientes').getElementsByTagName('tbody')[0];
        tablaPacientes.innerHTML = '';

        let fila = tablaPacientes.insertRow();
        fila.insertCell().textContent = paciente.cedula;
        fila.insertCell().textContent = paciente.nombre;
        fila.insertCell().textContent = paciente.apellidos;
        fila.insertCell().textContent = paciente.peso;
        fila.insertCell().textContent = paciente.edad;
        fila.insertCell().textContent = paciente.altura;
        fila.insertCell().textContent = paciente.enfermedades;
        fila.insertCell().textContent = paciente.tipoSangre;
        fila.insertCell().textContent = paciente.medicamentosAlergicos;
    }

    //----------------------------------------- Agregar Contacto de Emergencia -----------------------------------------//

    function agregarContactoFamiliar() {
        let pacienteId = document.getElementById('IdPaciente').value;
        let nombreCompleto = document.getElementById('NombreFamiliar').value;
        let telefono = document.getElementById('telefonoFamiliar').value;
        let relacionFamiliar = document.getElementById('relacion').value;
        let direccion = document.getElementById('direccion').value;

        obtenerInformacionPaciente(pacienteId)
            .then(paciente => {
                if (paciente) {
                    let contacto = {
                        pacienteId: pacienteId,
                        nombreCompleto: nombreCompleto,
                        telefono: telefono,
                        relacionFamiliar: relacionFamiliar,
                        direccion: direccion
                    };

                    let request = indexedDB.open('ClinicaDB');
                    request.onsuccess = function (event) {
                        let db = event.target.result;
                        let transaction = db.transaction(['familiares'], 'readwrite');
                        let store = transaction.objectStore('familiares');

                        let addRequest = store.add(contacto);
                        addRequest.onsuccess = function () {
                            console.log('Contacto familiar agregado correctamente');
                            cargarDatosPacientes();
                            mostrarToastContactoAgregado();
                            limpiarAgregarContactoEmergenciaModal();
                        };
                        addRequest.onerror = function () {
                            console.error('Error al agregar al contacto familiar');
                        };
                    };
                } else {
                    console.error('No se encontró al paciente con ID:', pacienteId);
                    mostrarToastPacienteNoEncontrado();
                }
            })
            .catch(error => {
                console.log('Error al obtener la información del paciente:', error);
                alert('Error al obtener la información del paciente');
            });
    }

    document.getElementById('agregarContactoEmergenciaBtn').addEventListener('click', function () {
        agregarContactoFamiliar();
    });



    //----------------------------------------- Buscar Contactos Emergencia-----------------------------------------//

    function obtenerContactosPorId(idPaciente) {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open('ClinicaDB');
            request.onsuccess = function (event) {
                let db = event.target.result;
                let transaction = db.transaction(['familiares'], 'readonly');
                let store = transaction.objectStore('familiares');
                let index = store.index('pacienteId');
    
                let contactos = [];
                index.openCursor(IDBKeyRange.only(idPaciente)).onsuccess = function (event) {
                    let cursor = event.target.result;
                    if (cursor) {
                        contactos.push(cursor.value);
                        cursor.continue();
                    } else {
                        resolve(contactos);
                    }
                };
                index.onerror = function (event) {
                    console.error('Error al obtener los contactos de emergencia:', event.target.error);
                    reject(event.target.error);
                };
            };
            request.onerror = function (event) {
                console.log('Error al abrir la base de datos:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    function mostrarContactosEmergencia(contactos) {
        let tablaContactosEmergencia = document.getElementById('tablaContactosEmergencia');
        tablaContactosEmergencia.innerHTML = '';
    
        contactos.forEach(contacto => {
            let fila = tablaContactosEmergencia.insertRow();
            // fila.insertCell().textContent = contacto.id;
            fila.insertCell().textContent = contacto.nombreCompleto;
            fila.insertCell().textContent = contacto.telefono;
            fila.insertCell().textContent = contacto.relacionFamiliar;
            fila.insertCell().textContent = contacto.direccion;
        });
    }
    
    document.getElementById('btnBuscarContactos').addEventListener('click', async function () {
        let idPacienteBuscar = document.getElementById('idPacienteBuscarEmergencia').value;
        let contactos = await obtenerContactosPorId(idPacienteBuscar);
        mostrarContactosEmergencia(contactos);
        limpiarBuscarContactoEmergenciaModal()
        cerrarModal('buscarContactosEmergencia');
        mostrarModalBuscarContactoEmergencia();
    });
    
    
    


    //----------------------------------------- Mostrar Modales  -----------------------------------------//

    //Modal de selecionar si deseo agregar un contacto de emergencia

    function mostrarModalSelectFamiliar() {
        var modal = document.getElementById('selectFamiliar');
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }
    function mostrarModalBuscarContactoEmergencia() {
        var modal = document.getElementById('contactosEmergenciaModal');
        var modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }


    //----------------------------------------- Cerrar Modales  -----------------------------------------//

    function cerrarModal(modalId) {
        var modalElement = document.getElementById(modalId);
        if (modalElement) {
            var modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            }
        }
    }


    //----------------------------------------- Limpiar Campos  -----------------------------------------//

    function limpiarEditarIdPaciente() {
        document.getElementById('idPacienteEditar').value = '';
    }

    function limpiarElimarPacienteModal() {
        document.getElementById('idPacienteEliminar').value = '';
    }

    function limpiarbuscarPacienteModal() {
        document.getElementById('idPacienteBuscar').value = '';
    }

    function limpiarAgregarPacienteModal() {
        document.getElementById('identificacion').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('peso').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('altura').value = '';
        document.getElementById('enfermedades').value = '';
        document.getElementById('tipoSangre').value = '';
        document.getElementById('alergias').value = '';
    }

    function limpiarAgregarContactoEmergenciaModal() {
        document.getElementById('IdPaciente').value = '';
        document.getElementById('NombreFamiliar').value = '';
        document.getElementById('telefonoFamiliar').value = '';
        document.getElementById('relacion').value = '';
        document.getElementById('direccion').value = '';
    }

    function limpiarBuscarContactoEmergenciaModal() {
        document.getElementById('idPacienteBuscarEmergencia').value = '';
    }


    //----------------------------------------- Toasts  -----------------------------------------//

    function mostrarToastPacienteAgregado() {
        var toast = new bootstrap.Toast(document.getElementById('toastPacienteAgregado'));
        toast.show();
        setTimeout(function () {
            toast.hide();
        }, 5000);
    }
    function mostrarToastPacienteEliminado() {
        var toast = new bootstrap.Toast(document.getElementById('toastPacienteEliminado'));
        toast.show();
        setTimeout(function () {
            toast.hide();
        }, 5000);
    }
    function mostrarToastPacienteActualizado() {
        var toast = new bootstrap.Toast(document.getElementById('toastPacienteActualizado'));
        toast.show();
        setTimeout(function () {
            toast.hide();
        }, 5000);
    }
    function mostrarToastPacienteNoEncontrado() {
        var toast = new bootstrap.Toast(document.getElementById('toastPacienteNoEncontrado'));
        toast.show();
        setTimeout(function () {
            toast.hide();
        }, 3000);
    }
    function mostrarToastPacienteEncontrado() {
        var toast = new bootstrap.Toast(document.getElementById('toastBuscarPaciente'));
        toast.show();
        setTimeout(function () {
            toast.hide();
        }, 5000);
    }
    function mostrarToastContactoAgregado() {
        var toast = new bootstrap.Toast(document.getElementById('toastContactoEmergenciaAgregado'));
        toast.show();
        setTimeout(function () {
            toast.hide();
        }, 5000);
    }


    function mostrarToastCompleteDatos() {
        var toast = new bootstrap.Toast(document.getElementById('toastIngreseDatos'));
        toast.show();
        setTimeout(function () {
            toast.hide();
        }, 5000);
    }



    



