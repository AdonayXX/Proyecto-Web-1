document.addEventListener("DOMContentLoaded", function () {
    checkUserRole();
    const menuToggle = document.getElementById("menu-toggle");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");

    checkLoginState();

    function checkLoginState() {
        const role = sessionStorage.getItem("userRole");
        if (role) {
            if (role === "public") {
                menuToggle.style.display = "none"; 
                logoutButton.style.display = "block"; 
                loginButton.style.display = "none"; 
            } else {
                menuToggle.style.display = "block"; 
                logoutButton.style.display = "block"; 
                loginButton.style.display = "none"; 
            }
        } else {
            menuToggle.style.display = "none"; 
            logoutButton.style.display = "none"; 
            loginButton.style.display = "block"; 
        }
    }

    function simulateLogin(role) {
        sessionStorage.setItem("userRole", role);
        checkLoginState();
    }

    function simulateLogout() {
        const confirmLogout = confirm("¿Está seguro de que desea cerrar la sesión?");
        if (confirmLogout) {
            sessionStorage.removeItem("userRole");
            checkLoginState();
        }
    }

    loginButton.addEventListener("click", function () {
        simulateLogin("admin"); 
    });

    logoutButton.addEventListener("click", function () {
        simulateLogout();
    });

         // Verificar el rol del usuario al cargar la página
      
       
  function checkUserRole() {
    const userRole = sessionStorage.getItem('userRole');

    const optionsByRole = {
      admin: ['Gestión de Medicos y especialidades', 'Añadir Citas', 'Gestión de Roles', 'Gestión de Pacientes', 'Gestión de Consultas', 'Gestión de Consultas Enfermeras','Gestión de Consultas Medico', 'Gestión de Citas', 'Gestión de Examenes', 'Historial de Exámenes'],
      recepcionista: ['Gestión de Citas', 'Añadir Citas'],
      medico: [ 'Gestión de Pacientes',  'Historial de Exámenes', 'Gestión de Consultas Medico'],
      enfermero: ['Gestión de Consultas', 'Gestión de Consultas Enfermeras','Gestión de Examenes', 'Historial de Exámenes'],
      public: [] 
    };

    const sidebarOptions = document.querySelectorAll('.opt');

    sidebarOptions.forEach(option => {
      const optionText = option.textContent.trim();

      if (optionsByRole[userRole]?.includes(optionText)) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    });
  }

      
});

