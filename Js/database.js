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
        getUsers()
    };

    request.onupgradeneeded = function (event) {
        let db = event.target.result;

        if (!db.objectStoreNames.contains('especialidades')) {
            db.createObjectStore('especialidades', { keyPath: 'id', autoIncrement: true });
        }
    
        // Almacén para doctores
        if (!db.objectStoreNames.contains('doctores')) {
            let doctorStore = db.createObjectStore('doctores', { keyPath: 'id', autoIncrement: true });
            doctorStore.createIndex('especialidad', 'especialidad', { unique: false });
        }
    
        // Almacén para citas, se añade un índice para pacienteId
        if (!db.objectStoreNames.contains('citas')) {
            let citaStore = db.createObjectStore('citas', { keyPath: 'id', autoIncrement: true });
            citaStore.createIndex('doctor', 'doctor', { unique: false });
            // Índice compuesto para doctor y fecha, sin cambios
            citaStore.createIndex('doctorFecha', ['doctor', 'fecha'], { unique: false });
            // Nuevo índice para pacienteId
            citaStore.createIndex('pacienteId', 'pacienteId', { unique: false });
        }
    
        // Almacén para usuarios
        if (!db.objectStoreNames.contains('usuarios')) {
            const userStore = db.createObjectStore('usuarios', { keyPath: 'id', autoIncrement: true });
            userStore.createIndex('name', 'name', { unique: false });
            userStore.createIndex('email', 'email', { unique: true });
            userStore.createIndex('password', 'password', { unique: false });
            userStore.createIndex('rol', 'rol', { unique: false });
        }
        //Almacen para pacientes
        if (!db.objectStoreNames.contains('pacientes')) {
            const pacienteStore = db.createObjectStore('pacientes', { keyPath: 'pacienteId', autoIncrement: true });
            pacienteStore.createIndex('nombre', 'nombre', { unique: false });
            pacienteStore.createIndex('apellidos', 'apellidos', { unique: false });
            pacienteStore.createIndex('numeroTelefono', 'numeroTelefono', { unique: false });
            // Aquí iría la información para los familiares.
        }


    };

}
openDatabase();