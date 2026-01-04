// ========================
// CONFIGURACIÓN INICIAL
// ========================
document.addEventListener('DOMContentLoaded', function() {
    // Las cookies se manejan ahora con cookies.js
    
    // ========================
    // CARRUSEL AUTOMÁTICO
    // ========================
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        // Inicializar el carrusel con autoplay
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 4000, // 4 segundos entre slides
            wrap: true,     // volver al inicio después del último
            ride: 'carousel' // iniciar automáticamente
        });
    }
    
    // ========================
    // GALERÍA JAVASCRIPT PURO
    // ========================
    inicializarGaleriaJS();
    
    // ========================
    // BANNER MÓVIL
    // ========================
    const closeBannerBtn = document.getElementById('closeBannerBtn');
    if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', function() {
            const banner = document.querySelector('.mobile-banner');
            if (banner) {
                banner.style.display = 'none';
            }
        });
    }

    // ========================
    // FORMULARIO DE RESERVA
    // ========================
    const formReserva = document.getElementById('formReserva');
    if (formReserva) {
        // Validar teléfono en tiempo real
        const telefonoInput = document.getElementById('telefono');
        if (telefonoInput) {
            telefonoInput.addEventListener('input', function() {
                this.value = this.value.replace(/\D/g, '');
                if (this.value.length > 9) {
                    this.value = this.value.substring(0, 9);
                }
            });
        }
        
        // Validar número de personas
        const personasInput = document.getElementById('personas');
        if (personasInput) {
            personasInput.addEventListener('input', function() {
                const valor = parseInt(this.value);
                if (isNaN(valor) || valor < 1) {
                    this.value = '';
                }
            });
        }
        
        // Envío del formulario - AQUÍ MODIFICAMOS CSS CON JS
        formReserva.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Primero verificar si se aceptaron cookies
            if (getCookie('aceptar_cookie') !== '1') {
                alert('Debe aceptar las cookies para enviar el formulario.');
                return;
            }
            
            // 1. Primero validamos normalmente
            if (!formReserva.checkValidity()) {
                // 2. Añadir clase de Bootstrap (como ya hacíamos)
                formReserva.classList.add('was-validated');
                
                // 3. AHORA MODIFICAMOS CSS CON JAVASCRIPT (REQUISITO)
                modificarCSSconJS(formReserva);
                
                return;
            }
            
            // Enviar datos a Postman Echo
            const formData = new FormData(formReserva);
            fetch('https://postman-echo.com/post', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Mostrar mensaje de éxito
                const mensajeExito = document.getElementById('mensajeExito');
                if (mensajeExito) {
                    mensajeExito.classList.remove('d-none');
                    setTimeout(() => {
                        mensajeExito.classList.add('d-none');
                    }, 5000);
                }
                
                // Resetear formulario y limpiar estilos JS
                formReserva.reset();
                formReserva.classList.remove('was-validated');
                limpiarCSSconJS(formReserva);
                
                // Guardar datos del formulario en cookies (opcional)
                setCookie('ultima_reserva', new Date().toISOString(), 30);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al enviar la reserva. Por favor, inténtelo de nuevo.');
            });
        });
    }

    // ========================
    // FORMULARIO DE CONTACTO
    // ========================
    const formContacto = document.getElementById('formContacto');
    if (formContacto) {
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Primero verificar si se aceptaron cookies
            if (getCookie('aceptar_cookie') !== '1') {
                alert('Debe aceptar las cookies para enviar el formulario.');
                return;
            }
            
            // 1. Primero validamos normalmente
            if (!formContacto.checkValidity()) {
                // 2. Añadir clase de Bootstrap (como ya hacíamos)
                formContacto.classList.add('was-validated');
                
                // 3. AHORA MODIFICAMOS CSS CON JAVASCRIPT (REQUISITO)
                modificarCSSconJS(formContacto);
                
                return;
            }
            
            // Enviar datos a Postman Echo
            const formData = new FormData(formContacto);
            fetch('https://postman-echo.com/post', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Mostrar mensaje de éxito
                const mensajeContacto = document.getElementById('mensajeContacto');
                if (mensajeContacto) {
                    mensajeContacto.classList.remove('d-none');
                    setTimeout(() => {
                        mensajeContacto.classList.add('d-none');
                    }, 5000);
                }
                
                // Resetear formulario y limpiar estilos JS
                formContacto.reset();
                formContacto.classList.remove('was-validated');
                limpiarCSSconJS(formContacto);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al enviar el mensaje. Por favor, inténtelo de nuevo.');
            });
        });
    }
    
    // ========================
    // FLECHAS DEL MENÚ DESPLEGABLE (menu.html)
    // ========================
    const menuDia = document.getElementById('menu-dia');
    const flechaMenuDia = document.getElementById('flecha-menu-dia');
    
    if (menuDia && flechaMenuDia) {
        menuDia.addEventListener('show.bs.collapse', function() {
            flechaMenuDia.classList.remove('bi-chevron-up');
            flechaMenuDia.classList.add('bi-chevron-down');
        });
        
        menuDia.addEventListener('hide.bs.collapse', function() {
            flechaMenuDia.classList.remove('bi-chevron-down');
            flechaMenuDia.classList.add('bi-chevron-up');
        });
    }
    
    const platosPrincipales = document.getElementById('platos-principales');
    const flechaPlatos = document.getElementById('flecha-platos-principales');
    
    if (platosPrincipales && flechaPlatos) {
        platosPrincipales.addEventListener('show.bs.collapse', function() {
            flechaPlatos.classList.remove('bi-chevron-up');
            flechaPlatos.classList.add('bi-chevron-down');
        });
        
        platosPrincipales.addEventListener('hide.bs.collapse', function() {
            flechaPlatos.classList.remove('bi-chevron-down');
            flechaPlatos.classList.add('bi-chevron-up');
        });
    }
    
    // ========================
    // AUTOPLAY VIDEOS (about.html)
    // ========================
    const videos = document.querySelectorAll('.video-item');
    
    if (videos.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Solo reproducir si las cookies fueron aceptadas
                    if (getCookie('aceptar_cookie') === '1') {
                        entry.target.play().catch(e => console.log("Autoplay bloqueado:", e));
                    }
                } else {
                    entry.target.pause();
                }
            });
        }, {
            threshold: 0.5
        });

        videos.forEach(video => {
            observer.observe(video);
        });
    }
    
    // ========================
    // BANNER PROMOCIONAL (about.html)
    // ========================
    inicializarBannerPromocional();
});

// ========================
// FUNCIONES PARA GALERÍA JS PURO
// ========================

function inicializarGaleriaJS() {
    const galeriaOverlay = document.getElementById('galeriaJS');
    const galeriaImagen = document.getElementById('galeriaJSImagen');
    const galeriaTitulo = document.getElementById('galeriaJSTitulo');
    const galeriaDescripcion = document.getElementById('galeriaJSDescripcion');
    const cerrarBtn = document.getElementById('cerrarGaleriaJS');
    const imagenes = document.querySelectorAll('.galeria-img');
    
    // Si no hay galería en esta página, salir
    if (!galeriaOverlay) return;
    
    // Función para abrir la galería
    function abrirGaleria(imgSrc, titulo, descripcion) {
        if (!galeriaImagen || !galeriaTitulo || !galeriaDescripcion) return;
        
        galeriaImagen.src = imgSrc;
        galeriaImagen.alt = titulo;
        galeriaTitulo.textContent = titulo;
        galeriaDescripcion.textContent = descripcion;
        galeriaOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
    
    // Función para cerrar la galería
    function cerrarGaleria() {
        galeriaOverlay.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar scroll
    }
    
    // 1. Asignar eventos a cada imagen de la galería
    imagenes.forEach(img => {
        img.addEventListener('click', function() {
            const card = this.closest('.galeria-item');
            if (card) {
                const titulo = card.querySelector('.pie-foto h5')?.textContent || 'Plato';
                const descripcion = card.querySelector('.pie-foto p')?.textContent || 'Descripción del plato';
                abrirGaleria(this.src, titulo, descripcion);
            }
        });
    });
    
    // 2. Cerrar con el botón X
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', cerrarGaleria);
        // Accesibilidad: cerrar con Enter
        cerrarBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                cerrarGaleria();
            }
        });
    }
    
    // 3. Cerrar haciendo clic fuera de la imagen
    galeriaOverlay.addEventListener('click', function(e) {
        if (e.target === galeriaOverlay) {
            cerrarGaleria();
        }
    });
    
    // 4. Cerrar con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galeriaOverlay.style.display === 'flex') {
            cerrarGaleria();
        }
    });
}

// ========================
// FUNCIONES PARA VALIDACIÓN CON MODIFICACIÓN DE CSS MEDIANTE JS
// ========================

function modificarCSSconJS(formulario) {
    // Obtener todos los campos inválidos
    const camposInvalidos = formulario.querySelectorAll(':invalid');
    
    // Para cada campo inválido, MODIFICAR CSS CON JAVASCRIPT
    camposInvalidos.forEach(campo => {
        // SOLO CAMBIAR EL COLOR - nada de animaciones
        campo.style.borderColor = '#dc3545'; // Rojo Bootstrap, aplicado con JS
        
        // También cambiar el color del label
        const label = formulario.querySelector(`label[for="${campo.id}"]`);
        if (label) {
            label.style.color = '#dc3545'; // MODIFICADO CON JS
        }
        
        // Cambiar color del mensaje de error
        const mensajeError = campo.nextElementSibling;
        if (mensajeError && mensajeError.classList.contains('invalid-feedback')) {
            mensajeError.style.display = 'block';
            mensajeError.style.color = '#dc3545'; // MODIFICADO CON JS
        }
    });
}

function limpiarCSSconJS(formulario) {
    // Limpiar todos los estilos aplicados con JS
    const todosCampos = formulario.querySelectorAll('input, textarea, select');
    
    todosCampos.forEach(campo => {
        // Restaurar color original del borde
        campo.style.borderColor = '';
        
        // Restaurar color del label
        const label = formulario.querySelector(`label[for="${campo.id}"]`);
        if (label) {
            label.style.color = '';
        }
        
        // Ocultar mensaje de error
        const mensajeError = campo.nextElementSibling;
        if (mensajeError && mensajeError.classList.contains('invalid-feedback')) {
            mensajeError.style.display = 'none';
        }
    });
}

// ========================
// BANNER PROMOCIONAL NUEVO
// ========================
function inicializarBannerPromocional() {
    const banner = document.getElementById('bannerPromocional');
    const btnCerrar = document.getElementById('btnCerrarPromocional');
    
    if (!banner || !btnCerrar) return;
    
    // Evento para cerrar el banner
    btnCerrar.addEventListener('click', function() {
        banner.style.display = 'none';
    });
    
    // Ajustar posición del banner al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (!banner || banner.style.display === 'none') return;
    });
}