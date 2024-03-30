document.addEventListener("DOMContentLoaded", function () {
    var formExamenSangre = document.getElementById("formExamenSangre");
    var formExamenOrina = document.getElementById("formExamenOrina");

    formExamenSangre.addEventListener("submit", function (event) {
        event.preventDefault();
        mostrarToast('toastExamenSangre', 7000);
    });

    formExamenOrina.addEventListener("submit", function (event) {
        event.preventDefault();
        mostrarToast('toastExamenOrina', 7000);
    });

    function mostrarToast(idToast) {
        var toastEl = document.getElementById(idToast);
        var toast = new bootstrap.Toast(toastEl);

        var fechaActual = new Date().toLocaleDateString('cr-CR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        var toastBody = toastEl.querySelector('.toast-body');
        toastBody.textContent = `Registrado con éxito el ${fechaActual}.`;
        toast.show();
    }
});