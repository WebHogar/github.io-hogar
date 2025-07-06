// Selecciona todos los enlaces del navbar
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        // Previene el comportamiento por defecto del enlace para un desplazamiento suave
        event.preventDefault();

        // Obtiene el href del enlace clicado
        const href = this.getAttribute('href');

        // Si el href es una URL externa (no un ancla en la misma página)
        if (href.startsWith('index.html') || href.endsWith('.html')) {
            // Navega a la página directamente
            window.location.href = href;
        } else {
            // Si es un ancla en la misma página (index.html)
            // Quita la clase "active" de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            // Agrega la clase "active" solo al enlace clicado
            this.classList.add('active');

            // Obtiene el ID de la sección a la que se debe desplazar
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Realiza el desplazamiento suave
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }

        // Cierra el menú de navegación en dispositivos pequeños después de hacer clic
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// Lógica para establecer el enlace activo en la carga de la página
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Check if the link's href matches the current path or is the index page
        if (currentPath.includes(linkHref.replace('index.html', '')) && linkHref !== 'index.html') {
            link.classList.add('active');
        } else if (currentPath === '/' || currentPath === '/index.html') {
            // Special handling for the home link on the index page
            if (linkHref === '#inicio' || linkHref === 'index.html') {
                link.classList.add('active');
            }
        }
    });
});
