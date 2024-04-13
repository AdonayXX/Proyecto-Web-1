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
            // Índice compuesto para doctor y fecha para asignar una cita
            citaStore.createIndex('doctorFecha', ['doctor', 'fecha'], { unique: false });
            // Nuevo índice para pacienteId
            // Índice compuesto para estado y fecha para asignar un estado
            citaStore.createIndex('estadoFecha', ['estado', 'fecha'], { unique: false });
            
            citaStore.createIndex('pacienteIdFecha', ['pacienteId', 'fecha'], { unique: false });
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
            const pacienteStore = db.createObjectStore('pacientes', { keyPath: 'pacienteId', autoIncrement: true, unique: true });
            pacienteStore.createIndex('nombre', 'nombre', { unique: false });
            pacienteStore.createIndex('apellidos', 'apellidos', { unique: false });
            pacienteStore.createIndex('cedula', 'cedula', { unique: true });
            pacienteStore.createIndex('numeroTelefono', 'numeroTelefono', { unique: false });
            pacienteStore.createIndex('peso', 'peso', { unique: false });
            pacienteStore.createIndex('edad', 'edad', { unique: false });
            pacienteStore.createIndex('altura', 'altura', { unique: false });
            pacienteStore.createIndex('medicamentosAlergicos', 'medicamentosAlergicos', { unique: false });
            pacienteStore.createIndex('tipoSangre', 'tipoSangre', { unique: false });
            pacienteStore.createIndex('enfermedades', 'enfermedades', { unique: false });
        }
        //Almacén para contactos de Emergencia
        if (!db.objectStoreNames.contains('familiares')) {
            //Pide el número de cédula del familiar
            const familiaresStore = db.createObjectStore('familiares', { keyPath: 'familiarId', autoIncrement: true });
            familiaresStore.createIndex('pacienteId', 'pacienteId', { unique: false });
            familiaresStore.createIndex('nombreCompleto', 'nombreCompleto', { unique: false });
            familiaresStore.createIndex('relacionFamiliar', 'relacionFamiliar', { unique: false });
            familiaresStore.createIndex('telefono', 'telefono', { unique: false });
            familiaresStore.createIndex('direccion', 'direccion', { unique: false });
        }
        //Almacén para consultas médicas
        if (!db.objectStoreNames.contains('consultasMedicas')) {
            const consultasMedicasStore = db.createObjectStore('consultasMedicas', { keyPath: 'consultaId', autoIncrement: true });
            consultasMedicasStore.createIndex('pacienteId', 'pacienteId', { unique: false });
            consultasMedicasStore.createIndex('presion', 'presion', { unique: false });
            consultasMedicasStore.createIndex('peso', 'peso', { unique: false });
            consultasMedicasStore.createIndex('sintomas', 'sintomas', { unique: false });
            consultasMedicasStore.createIndex('fecha', 'fecha', { unique: false });
            consultasMedicasStore.createIndex('diagnostico', 'diagnostico', { unique: false });
            consultasMedicasStore.createIndex('medicamentos', 'medicamentos', { unique: false });
            consultasMedicasStore.createIndex('examenes', 'examenes', { unique: false });
            consultasMedicasStore.createIndex('pacienteIdFecha', ['pacienteId', 'fecha'], { unique: false });
        }
        // Almacen para registro de presión y peso
        if (!db.objectStoreNames.contains('registrosPresionPeso')) {
            const registrosStore = db.createObjectStore('registrosPresionPeso', { keyPath: 'registroId', autoIncrement: true });
            registrosStore.createIndex('pacienteId', 'pacienteId', { unique: false });
            registrosStore.createIndex('fechaHora', 'fechaHora', { unique: false });
            registrosStore.createIndex('presion', 'presion', { unique: false });
            registrosStore.createIndex('peso', 'peso', { unique: false });
        }

        // Almacen para exámenes de sangre
        if (!db.objectStoreNames.contains('examenesSangre')) {
            const examenesSangreStore = db.createObjectStore('examenesSangre', { keyPath: 'ExamenSangreId', autoIncrement: true });
            examenesSangreStore.createIndex('pacienteId', 'pacienteId', { unique: false });
            examenesSangreStore.createIndex('consultaId', 'consultaId', { unique: false });
            examenesSangreStore.createIndex('hemoglobina', 'hemoglobina', { unique: false });
            examenesSangreStore.createIndex('hematocrito', 'hematocrito', { unique: false });
            examenesSangreStore.createIndex('trigliceridos', 'trigliceridos', { unique: false });
            examenesSangreStore.createIndex('colesterolTotal', 'colesterolTotal', { unique: false });
            examenesSangreStore.createIndex('acidoUrico', 'acidoUrico', { unique: false });
            examenesSangreStore.createIndex('creatinina', 'creatinina', { unique: false });
        }

        //Almacen para examenes de Orina
        if (!db.objectStoreNames.contains('examenesOrina')) {
            const examenOrinaStore = db.createObjectStore('examenesOrina', { keyPath: 'id', autoIncrement: true })
            examenOrinaStore.createIndex('pacienteId', 'pacienteId', { unique: false });
            examenOrinaStore.createIndex('consultaId', 'consultaId', { unique: false });
            examenOrinaStore.createIndex('glucosa', 'glucosa', { unique: false });
            examenOrinaStore.createIndex('eritrocitos', 'eritrocitos', { unique: false });
            examenOrinaStore.createIndex('color', 'color', { unique: false });
            examenOrinaStore.createIndex('leucocitos', 'leucocitos', { unique: false });
        }    
        

    };

}

openDatabase();