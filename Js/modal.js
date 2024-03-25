// Función para abrir el modal
function openModal(imgSrc) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = imgSrc;

    // Agregar un evento para cerrar el modal al hacer clic fuera de la imagen
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal(); // Llama a la función closeModal para cerrar el modal
        }
    };
}

// Función para cerrar el modal
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}
