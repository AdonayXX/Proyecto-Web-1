document.addEventListener("DOMContentLoaded", function() {
    var menuToggle = document.getElementById("menu-toggle");
    var wrapper = document.getElementById("wrapper");

    menuToggle.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation(); 
        wrapper.classList.toggle("toggled");
    });

    document.addEventListener("click", function(e) {
        if (wrapper.classList.contains("toggled") && e.target !== menuToggle && !menuToggle.contains(e.target) && !wrapper.contains(e.target)) {
            wrapper.classList.remove("toggled");
        }
    });
});