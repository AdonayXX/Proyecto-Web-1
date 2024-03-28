document.addEventListener("DOMContentLoaded", function () {
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
});
