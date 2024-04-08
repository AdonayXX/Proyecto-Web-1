// async function agregarPruebaSangre() {
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
//         // Verificar la existencia del paciente y la consulta (asumiendo que tienes una función así)
//         // const existen = await verificarExistenciaPacienteConsulta(pacienteId, consultaId);
//         // if (!existen) {
//         //     alert('El paciente o la consulta no existen en la base de datos.');
//         //     return;
//         // }

//         // Crear el objeto de la prueba de sangre con los datos proporcionados
//         let pruebaSangre = {
//             hemoglobina: hemoglobina,
//             hematocrito: hematocrito,
//             trigliceridos: trigliceridos,
//             colesterolTotal: colesterolTotal,
//             acidoUrico: acidoUrico,
//             creatinina: creatinina
//         };

//         // Abrir la base de datos IndexedDB
//         let request = indexedDB.open('ClinicaDB');
//         request.onsuccess = function (event) {
//             let db = event.target.result;
//             let transaction = db.transaction(['pruebaSangre'], 'readwrite');
//             let store = transaction.objectStore('pruebaSangre');

//             // Agregar la prueba de sangre al almacén
//             let addRequest = store.add(pruebaSangre);
//             addRequest.onsuccess = function () {
//                 console.log('Prueba de sangre agregada correctamente');
//                 // Aquí puedes realizar cualquier acción adicional después de agregar la prueba de sangre, como cargar datos o mostrar un mensaje de éxito.
//             };
//             addRequest.onerror = function () {
//                 console.error('Error al agregar la prueba de sangre');
//             };
//         };
//         request.onerror = function (event) {
//             console.error('Error al abrir la base de datos:', event.target.error);
//         };
//     } catch (error) {
//         console.error('Error al verificar la existencia del paciente y la consulta:', error);
//     }
// }

// // Ejemplo de cómo llamar a la función agregarPruebaSangre
// document.getElementById('agregarExamenSangre').addEventListener('click', function () {
//     agregarPruebaSangre();
// });