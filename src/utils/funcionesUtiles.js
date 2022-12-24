import Swal from "sweetalert2";

const mensaje = (mensaje, opcion) => {
    let buttonText = "";
    opcion === "back" ? buttonText = "VOLVER" : buttonText = "HOME";
    Swal.fire({
        title: mensaje,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: buttonText,
        allowOutsideClick: false,
        allowEscapeKey: false,
        scrollbarPadding: false
    })  
    .then((result) => {
        if (result.isConfirmed) {
            if (opcion === "back") {
                window.history.back() 
            } else  {
                window.location.href = "/";
            }
        }
    })
}

export {mensaje};