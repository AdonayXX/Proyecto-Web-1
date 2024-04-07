//----------------------------------------- AgregarExamenesdeSangre -----------------------------------------//
//Funcion sin verificacion de existencia de consulta
async function agregarExamenSangre() {
    let pacienteId = document.getElementById('pacienteId').value;
    let consultaId = document.getElementById('consultaId').value;
    let hemoglobina = document.getElementById('hemoglobina').value;
    let hematocrito = document.getElementById('hematocrito').value;
    let trigliceridos = document.getElementById('trigliceridos').value;
    let colesterolTotal = document.getElementById('colesterolTotal').value;
    let acidoUrico = document.getElementById('acidoUrico').value;
    let creatinina = document.getElementById('creatinina').value;

    // Verificar si los campos obligatorios están llenos
    if (!hemoglobina || !hematocrito || !trigliceridos || !colesterolTotal || !acidoUrico || !creatinina) {
        alert('Todos los campos son obligatorios. Por favor, complete todos los campos.');
        return; // Detener la ejecución si hay campos vacíos
    }

    try {
        // Abrir la base de datos IndexedDB
        let request = indexedDB.open('ClinicaDB');
        request.onsuccess = async function (event) {
            let db = event.target.result;

            // Iniciar una transacción para buscar el paciente
            let pacienteTransaction = db.transaction(['pacientes'], 'readonly');
            let pacienteStore = pacienteTransaction.objectStore('pacientes');
            let pacienteRequest = pacienteStore.get(pacienteId);

            pacienteRequest.onsuccess = async function (event) {
                let paciente = event.target.result;

                // Si el paciente existe, agregar el examen de sangre
                if (paciente) {
                    let examenSangre = {
                        pacienteId: pacienteId,
                        consultaId: consultaId,
                        hemoglobina: hemoglobina,
                        hematocrito: hematocrito,
                        trigliceridos: trigliceridos,
                        colesterolTotal: colesterolTotal,
                        acidoUrico: acidoUrico,
                        creatinina: creatinina
                    };

                    let transaction = db.transaction(['examenesSangre'], 'readwrite');
                    let store = transaction.objectStore('examenesSangre');

                    // Agregar el examen de sangre al almacén
                    let addRequest = store.add(examenSangre);
                    addRequest.onsuccess = function () {
                        console.log('Examen de sangre agregado correctamente');
                        // Aquí puedes realizar cualquier acción adicional después de agregar el examen de sangre, como cargar datos o mostrar un mensaje de éxito.
                    };
                    addRequest.onerror = function () {
                        console.error('Error al agregar el examen de sangre');
                    };
                } else {
                    alert('El paciente no existe en la base de datos.');
                }
            };
            pacienteRequest.onerror = function (event) {
                console.log('Error al obtener la información del paciente:', event.target.error);
            };
        };
        request.onerror = function (event) {
            console.error('Error al abrir la base de datos:', event.target.error);
        };
    } catch (error) {
        console.error('Error al verificar la existencia del paciente:', error);
    }
}

document.getElementById('agregarExamenSangre').addEventListener('click', function () {
    agregarExamenSangre();
});



//----------------------------------------- AgregarExamenesdeOrina -----------------------------------------//
async function agregarExamenOrina() {
    let pacienteId = document.getElementById('pacienteId').value;
    let consultaId = document.getElementById('consultaId').value;
    let glucosa = document.getElementById('glucosa').value;
    let eritrocitos = document.getElementById('eritrocitos').value;
    let color = document.getElementById('color').value;
    let leucocitos = document.getElementById('leucocitos').value;

    // Verificar si los campos obligatorios están llenos
    if (!glucosa || !eritrocitos || !color || !leucocitos) {
        alert('Todos los campos son obligatorios. Por favor, complete todos los campos.');
        return; // Detener la ejecución si hay campos vacíos
    }

    try {
        // Abrir la base de datos IndexedDB
        let request = indexedDB.open('ClinicaDB');
        request.onsuccess = async function (event) {
            let db = event.target.result;

            // Iniciar una transacción para buscar el paciente
            let pacienteTransaction = db.transaction(['pacientes'], 'readonly');
            let pacienteStore = pacienteTransaction.objectStore('pacientes');
            let pacienteRequest = pacienteStore.get(pacienteId);

            pacienteRequest.onsuccess = async function (event) {
                let paciente = event.target.result;

                // Si el paciente existe, verificar si la consulta existe
                if (paciente) {
                    let consultaTransaction = db.transaction(['consultas'], 'readonly');
                    let consultaStore = consultaTransaction.objectStore('consultas');
                    let consultaRequest = consultaStore.get(consultaId);

                    consultaRequest.onsuccess = async function (event) {
                        let consulta = event.target.result;

                        // Si la consulta existe, agregar el examen de orina
                        if (consulta) {
                            let examenOrina = {
                                pacienteId: pacienteId,
                                consultaId: consultaId,
                                glucosa: glucosa,
                                eritrocitos: eritrocitos,
                                color: color,
                                leucocitos: leucocitos
                            };

                            let transaction = db.transaction(['examenesOrina'], 'readwrite');
                            let store = transaction.objectStore('examenesOrina');

                            // Agregar el examen de orina al almacén
                            let addRequest = store.add(examenOrina);
                            addRequest.onsuccess = function () {
                                console.log('Examen de orina agregado correctamente');
                                // Aquí puedes realizar cualquier acción adicional después de agregar el examen de orina, como cargar datos o mostrar un mensaje de éxito.
                            };
                            addRequest.onerror = function () {
                                console.error('Error al agregar el examen de orina');
                            };
                        } else {
                            alert('El ID de consulta proporcionado no está asociado a ninguna consulta en la base de datos.');
                        }
                    };
                    consultaRequest.onerror = function (event) {
                        console.log('Error al obtener la información de la consulta:', event.target.error);
                    };
                } else {
                    alert('El paciente no existe en la base de datos.');
                }
            };
            pacienteRequest.onerror = function (event) {
                console.log('Error al obtener la información del paciente:', event.target.error);
            };
        };
        request.onerror = function (event) {
            console.error('Error al abrir la base de datos:', event.target.error);
        };
    } catch (error) {
        console.error('Error al verificar la existencia del paciente:', error);
    }
}

document.getElementById('ExamenesOrina').addEventListener('click', function () {
    agregarExamenOrina();
});


//----------------------------------------- AgregarExamenesdeOrina -----------------------------------------//
// async function agregarExamenOrina() {
//     let pacienteId = document.getElementById('pacienteId').value;
//     let consultaId = document.getElementById('consultaId').value;
//     let glucosa = document.getElementById('glucosa').value;
//     let eritrocitos = document.getElementById('eritrocitos').value;
//     let color = document.getElementById('color').value;
//     let leucocitos = document.getElementById('leucocitos').value;

//     // Verificar si los campos obligatorios están llenos
//     if (!glucosa || !eritrocitos || !color || !leucocitos) {
//         alert('Todos los campos son obligatorios. Por favor, complete todos los campos.');
//         return; // Detener la ejecución si hay campos vacíos
//     }

//     try {
//         // Abrir la base de datos IndexedDB
//         let request = indexedDB.open('ClinicaDB');
//         request.onsuccess = async function (event) {
//             let db = event.target.result;

//             // Verificar si hay una consulta asociada al ID proporcionado
//             let consultaTransaction = db.transaction(['consultas'], 'readonly');
//             let consultaStore = consultaTransaction.objectStore('consultas');
//             let consultaRequest = consultaStore.get(consultaId);

//             consultaRequest.onsuccess = async function (event) {
//                 let consulta = event.target.result;

//                 // Si la consulta existe, agregar el examen de orina
//                 if (consulta) {
//                     let examenOrina = {
//                         pacienteId: pacienteId,
//                         consultaId: consultaId,
//                         glucosa: glucosa,
//                         eritrocitos: eritrocitos,
//                         color: color,
//                         leucocitos: leucocitos
//                     };

//                     let transaction = db.transaction(['examenesOrina'], 'readwrite');
//                     let store = transaction.objectStore('examenesOrina');

//                     // Agregar el examen de orina al almacén
//                     let addRequest = store.add(examenOrina);
//                     addRequest.onsuccess = function () {
//                         console.log('Examen de orina agregado correctamente');
//                         // Aquí puedes realizar cualquier acción adicional después de agregar el examen de orina, como cargar datos o mostrar un mensaje de éxito.
//                     };
//                     addRequest.onerror = function () {
//                         console.error('Error al agregar el examen de orina');
//                     };
//                 } else {
//                     alert('El ID de consulta proporcionado no está asociado a ninguna consulta en la base de datos.');
//                 }
//             };
//             consultaRequest.onerror = function (event) {
//                 console.log('Error al obtener la información de la consulta:', event.target.error);
//             };
//         };
//         request.onerror = function (event) {
//             console.error('Error al abrir la base de datos:', event.target.error);
//         };
//     } catch (error) {
//         console.error('Error al verificar la existencia de la consulta:', error);
//     }
// }

document.getElementById('ExamenesOrina').addEventListener('click', function () {
    agregarExamenOrina();
});





//Funcion con verificacion de existencia de paciente y consulta
// async function agregarExamenSangre() {
//     let pacienteId = document.getElementById('pacienteId').value;
//     let consultaId = document.getElementById('consultaId').value;
//     let hemoglobina = document.getElementById('hemoglobina').value;
//     let hematocrito = document.getElementById('hematocrito').value;
//     let trigliceridos = document.getElementById('trigliceridos').value;
//     let colesterolTotal = document.getElementById('colesterolTotal').value;
//     let acidoUrico = document.getElementById('acidoUrico').value;
//     let creatinina = document.getElementById('creatinina').value;

//     // Verificar si los campos obligatorios están llenos
//     if (!hemoglobina || !hematocrito || !trigliceridos || !colesterolTotal || !acidoUrico || !creatinina) {
//         alert('Todos los campos son obligatorios. Por favor, complete todos los campos.');
//         return; // Detener la ejecución si hay campos vacíos
//     }

//     try {
//         // Abrir la base de datos IndexedDB
//         let request = indexedDB.open('ClinicaDB');
//         request.onsuccess = async function (event) {
//             console.log('Base de datos abierta con éxito');
//             let db = event.target.result;

//             // Iniciar una transacción para buscar el paciente
//             let pacienteTransaction = db.transaction(['pacientes'], 'readonly');
//             pacienteTransaction.onerror = function (event) {
//                 console.log('Error en la transacción de búsqueda de pacientes:', event.target.error);
//             };
//             let pacienteStore = pacienteTransaction.objectStore('pacientes');
//             let pacienteRequest = pacienteStore.get(pacienteId);

//             pacienteRequest.onsuccess = async function (event) {
//                 console.log('Consulta al paciente realizada con éxito');
//                 let paciente = event.target.result;

//                 // Si el paciente existe, buscar la consulta
//                 if (paciente) {
//                     console.log('Paciente encontrado:', paciente);
//                     let consultaTransaction = db.transaction(['consultasMedicas'], 'readonly');
//                     consultaTransaction.onerror = function (event) {
//                         console.log('Error en la transacción de búsqueda de consultas médicas:', event.target.error);
//                     };
//                     let consultaStore = consultaTransaction.objectStore('consultasMedicas');
//                     let consultaRequest = consultaStore.get(consultaId);
//                     console.log(consultaId);

//                     consultaRequest.onsuccess = async function (event) {
//                         console.log('Consulta a la consulta realizada con éxito');
//                         let consulta = event.target.result;
//                         console.log(consulta);

//                         // Si la consulta existe, agregar el examen de sangre
//                         if (consulta) {
//                             console.log('Consulta encontrada:', consulta);
//                             let examenSangre = {
//                                 pacienteId: pacienteId,
//                                 consultaId: consultaId,
//                                 hemoglobina: hemoglobina,
//                                 hematocrito: hematocrito,
//                                 trigliceridos: trigliceridos,
//                                 colesterolTotal: colesterolTotal,
//                                 acidoUrico: acidoUrico,
//                                 creatinina: creatinina
//                             };

//                             let transaction = db.transaction(['examenesSangre'], 'readwrite');
//                             transaction.onerror = function (event) {
//                                 console.log('Error en la transacción de escritura de examen de sangre:', event.target.error);
//                             };
//                             let store = transaction.objectStore('examenesSangre');

//                             // Agregar el examen de sangre al almacén
//                             let addRequest = store.add(examenSangre);
//                             addRequest.onsuccess = function () {
//                                 console.log('Examen de sangre agregado correctamente');
//                                 // Aquí puedes realizar cualquier acción adicional después de agregar el examen de sangre, como cargar datos o mostrar un mensaje de éxito.
//                             };
//                             addRequest.onerror = function () {
//                                 console.error('Error al agregar el examen de sangre');
//                             };
//                         } else {
//                             console.log('La consulta no existe en la base de datos.');
//                             alert('La consulta no existe en la base de datos.');
//                         }
//                     };
//                     consultaRequest.onerror = function (event) {
//                         console.log('Error al obtener la información de la consulta:', event.target.error);
//                     };
//                 } else {
//                     alert('El paciente no existe en la base de datos.');
//                 }
//             };
//             pacienteRequest.onerror = function (event) {
//                 console.log('Error al obtener la información del paciente:', event.target.error);
//             };
//         };
//         request.onerror = function (event) {
//             console.error('Error al abrir la base de datos:', event.target.error);
//         };
//     } catch (error) {
//         console.error('Error al verificar la existencia del paciente y la consulta:', error);
//     }
// }

// document.getElementById('agregarExamenSangre').addEventListener('click', function () {
//     agregarExamenSangre();
// });

//---------------------Examenes de Orina--------------------------------
function agregarExamenOrina(db, examenOrina) {
    const transaction = db.transaction(['examenesOrina'], 'readwrite');
    const store = transaction.objectStore('examenesOrina');
    
    const agregarRequest = store.add(examenOrina);

    agregarRequest.onsuccess = function(event) {
        console.log('Examen de orina agregado con éxito.');
    };

    agregarRequest.onerror = function(event) {
        console.error('Error al intentar agregar el examen de orina:', event.target.error);
    };
}


