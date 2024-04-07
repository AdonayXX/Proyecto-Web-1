document.addEventListener('DOMContentLoaded', function () {
  openDatabase().then(() => {
    getUsers();
    checkUserRole(); 
  }).catch(error => {
    console.error('Error initializing IndexedDB:', error);
  });
});


// Se encarga de abrir la base de datos

async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ClinicaDB', 1);

    request.onerror = function (event) {
      console.error('IndexedDB error:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = function (event) {
      db = event.target.result;
      resolve();
    };

    request.onupgradeneeded = function (event) {
      let db = event.target.result;
      if (!db.objectStoreNames.contains('usuarios')) {
        const userStore = db.createObjectStore('usuarios', { keyPath: 'id', autoIncrement: true });
        userStore.createIndex('name', 'name', { unique: false });
        userStore.createIndex('email', 'email', { unique: true });
        userStore.createIndex('password', 'password', { unique: false });
        userStore.createIndex('rol', 'rol', { unique: false });
      }
    };
  });
}

// Se encarga de obtener el rol del usuario almacenado en sessionStorage

function checkUserRole() {
  const userRole = getUserRole(); 

  if (userRole === 'public') {
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
      menuToggle.style.display = 'none'; 
    }
  }
}

// Se encarga de obtener los usuarios de la base de datos y mostrarlos en una tabla. También se encarga de actualizar el rol de un usuario en la base de datos

function getUsers() {
  if (db) {
    const transaction = db.transaction(['usuarios'], 'readonly');
    const store = transaction.objectStore('usuarios');

    const userList = document.getElementById('userList');
    if (!userList) {
      console.error('Element with ID "userList" not found.');
      return;
    }
    userList.innerHTML = '';

    store.openCursor().onsuccess = function (event) {
      const cursor = event.target.result;

      if (cursor) {
        const user = cursor.value;

        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = user.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const roleCell = document.createElement('td');
        const selectRole = document.createElement('select');
        selectRole.dataset.userId = user.id;

        const roles = ['public', 'admin', 'recepcionista', 'medico', 'enfermero'];
        roles.forEach(role => {
          const option = document.createElement('option');
          option.value = role;
          option.textContent = role;
          selectRole.appendChild(option);
        });

        selectRole.value = user.rol;

        selectRole.addEventListener('change', function () {
          updateUserRole(this.dataset.userId, this.value);
        });

        roleCell.appendChild(selectRole);
        row.appendChild(roleCell);

        userList.appendChild(row);

        cursor.continue();
      }
    };
  } else {
    console.error('IndexedDB is not available or not initialized.');
  }
}

// Se encarga de actualizar el rol de un usuario en la base de datos //


function updateUserRole(userId, newRole) {
  const transaction = db.transaction(['usuarios'], 'readwrite');
  const store = transaction.objectStore('usuarios');

  const request = store.get(Number(userId));

  request.onsuccess = function (event) {
    const user = event.target.result;

    if (user) {
      user.rol = newRole;
      const updateRequest = store.put(user);

      updateRequest.onsuccess = function () {
        getUsers();
        mostrarToastRolActualizado(); // Mostrar el toast después de actualizar el rol
      };

      updateRequest.onerror = function (event) {
        alert('Error al actualizar el rol del usuario: ' + event.target.errorCode);
      };
    } else {
      alert('Usuario no encontrado');
    }
  };

  request.onerror = function (event) {
    alert('Error al obtener el usuario para actualizar el rol: ' + event.target.errorCode);
  };

  function mostrarToastRolActualizado() {
    var toast = new bootstrap.Toast(document.getElementById('toastRolActualizado'));
    toast.show();
    setTimeout(function() {
      toast.hide();
    }, 3000);
  }
}

  

