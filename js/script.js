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
        
        // Envío del formulario
        formReserva.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Primero verificar si se aceptaron cookies
            if (getCookie('aceptar_cookie') !== '1') {
                alert('Debe aceptar las cookies para enviar el formulario.');
                return;
            }
            
            if (!formReserva.checkValidity()) {
                formReserva.classList.add('was-validated');
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
                
                // Resetear formulario
                formReserva.reset();
                formReserva.classList.remove('was-validated');
                
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
            
            if (!formContacto.checkValidity()) {
                formContacto.classList.add('was-validated');
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
                
                // Resetear formulario
                formContacto.reset();
                formContacto.classList.remove('was-validated');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al enviar el mensaje. Por favor, inténtelo de nuevo.');
            });
        });
    }

    // ========================
    // LIGHTBOX PARA GALERÍA DE PLATOS
    // ========================
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    
    if (lightboxModal) {
        lightboxModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const imageSrc = button.querySelector('img').src;
            const title = button.getAttribute('data-title');
            const description = button.getAttribute('data-description');
            
            lightboxImage.src = imageSrc;
            lightboxImage.alt = title;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
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