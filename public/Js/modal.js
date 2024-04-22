function openModal(imgSrc) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = imgSrc;

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal(); 
        }
    };
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}
