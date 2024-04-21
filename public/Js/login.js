document.addEventListener('DOMContentLoaded', function () {


  if (window.location.href.includes('/html/login.html')) {
    sessionStorage.clear();
  }


  function addUser() {
    var transaction = db.transaction(['usuarios'], 'readwrite');
    var store = transaction.objectStore('usuarios');

    var rol = 'public'; 

    var request = store.add({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        rol: rol 
    });

    request.onsuccess = function (event) {
        alert('Usuario agregado correctamente');
        redirectToRolePage(rol);
    };

    request.onerror = function (event) {
        alert('Error al agregar el usuario: ' + event.target.errorCode);
    };
    

  }
  document.getElementById('useradd').addEventListener('click', addUser);



  function login(event) {
    event.preventDefault();

    const email = document.getElementById('email-L').value;
    const password = document.getElementById('password-L').value;

    if (db) {
      const transaction = db.transaction(['usuarios'], 'readonly');
      const store = transaction.objectStore('usuarios');
      const index = store.index('email');

      const request = index.get(email);

      request.onsuccess = function (event) {
        const user = event.target.result;

        if (user && user.password === password) {
          sessionStorage.setItem('userRole', user.rol);
          redirectToRolePage(user.rol);
        } else {
          alert('Credenciales incorrectas');
        }
      };

      request.onerror = function (event) {
        alert('Error al iniciar sesión: ' + event.target.errorCode);
      };
    } else {
      console.error('IndexedDB is not available or not initialized.');
    }
  }

  document.getElementById('userlogin').addEventListener('click', login);

  function redirectToRolePage(rol) {
    window.location.href = '/html/principal.html';
  }

});

