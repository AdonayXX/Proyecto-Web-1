var db;

function openDatabase() {
    const request = indexedDB.open('ClinicaDB', 1);

    request.onerror = function (event) {
        console.error('IndexedDB error:', event.target.error);
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        cargarDoctores();
        cargarEspecialidades();
        cargarDoctoresPorEspecialidad();
        cargarHorasDisponibles();
    };

    request.onupgradeneeded = function (event) {
        let db = event.target.result;

        if (!db.objectStoreNames.contains('especialidades')) {
            db.createObjectStore('especialidades', { keyPath: 'id', autoIncrement: true });
        }

        if (!db.objectStoreNames.contains('doctores')) {
            let doctorStore = db.createObjectStore('doctores', { keyPath: 'id', autoIncrement: true });
            doctorStore.createIndex('especialidad', 'especialidad', { unique: false });
        }
        if (!db.objectStoreNames.contains('citas')) {
            let citaStore = db.createObjectStore('citas', { keyPath: 'id', autoIncrement: true });
            citaStore.createIndex('doctor', 'doctor', { unique: false });
            // Crea un índice compuesto para doctor y fecha
            citaStore.createIndex('doctorFecha', ['doctor', 'fecha'], { unique: false });
        }


    };

}
openDatabase();