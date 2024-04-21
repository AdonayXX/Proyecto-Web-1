function addAdmin(db) {
    const transaction = db.transaction(['usuarios'], 'readwrite');
    const store = transaction.objectStore('usuarios');

    const request = store.add({
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'admin',
        rol: 'admin'
    });

    request.onsuccess = function(event) {
        console.log('Administrador añadido con éxito');
    };

    request.onerror = function(event) {
        console.error('Error al añadir administrador:', request.error);
    };
    
    transaction.oncomplete = function(event) {
        console.log('Transacción completada con éxito.');
    };

    transaction.onerror = function(event) {
        console.error('Transacción fallida:', transaction.error);
    };
}
addAdmin(db);