document.addEventListener("DOMContentLoaded", function() {
    var menuToggle = document.getElementById("menu-toggle");
    var wrapper = document.getElementById("wrapper");

    // Manejador para el botón de toggle.
    menuToggle.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation(); // Evita que el evento se propague al document.
        wrapper.classList.toggle("toggled");
    });

    // Añadir manejador de eventos al document para cerrar el menú.
    document.addEventListener("click", function(e) {
        // Solo cierra el menú si está abierto y el clic fue fuera del menú y del botón de toggle.
        if (wrapper.classList.contains("toggled") && e.target !== menuToggle && !menuToggle.contains(e.target) && !wrapper.contains(e.target)) {
            wrapper.classList.remove("toggled");
        }
    });
});