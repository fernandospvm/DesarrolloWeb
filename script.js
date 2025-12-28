// =======================
// MENÚ DESPLEGABLE (FLECHA)
// =======================
const menuDia = document.getElementById("menu-dia");
const flecha = document.getElementById("flecha-menu-dia");

if (menuDia && flecha) {
    menuDia.addEventListener("show.bs.collapse", () => {
        flecha.classList.remove("bi-chevron-up");
        flecha.classList.add("bi-chevron-down");
    });

    menuDia.addEventListener("hide.bs.collapse", () => {
        flecha.classList.remove("bi-chevron-down");
        flecha.classList.add("bi-chevron-up");
    });
}

// =======================
// FORMULARIO RESERVA
// =======================
const formReserva = document.getElementById("formReserva");
const mensajeExito = document.getElementById("mensajeExito");

if (formReserva) {
    formReserva.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!formReserva.checkValidity()) {
            formReserva.classList.add("was-validated");
            return;
        }

        mensajeExito.classList.remove("d-none");
        formReserva.reset();
        formReserva.classList.remove("was-validated");
    });
}
//Validacion telefono
const telefonoInput = document.getElementById("telefono");

if (telefonoInput) {
    telefonoInput.addEventListener("input", () => {
        telefonoInput.value = telefonoInput.value.replace(/\D/g, "");
    });
}


// =======================
// VALIDACIÓN PERSONAS
// =======================
const personasInput = document.getElementById("personas");

if (personasInput) {
    personasInput.addEventListener("input", () => {
        const valor = personasInput.value;

        if (!Number.isInteger(Number(valor)) || Number(valor) < 1) {
            personasInput.value = "";
        }
    });
}

// =======================
// FORMULARIO CONTACTO
// =======================
const formContacto = document.getElementById("formContacto");
const mensajeContacto = document.getElementById("mensajeContacto");

if (formContacto) {
    formContacto.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!formContacto.checkValidity()) {
            formContacto.classList.add("was-validated");
            return;
        }

        mensajeContacto.classList.remove("d-none");
        formContacto.reset();
        formContacto.classList.remove("was-validated");
    });
}
