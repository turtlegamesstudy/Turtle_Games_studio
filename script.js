document.querySelector('.download-btn').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Gracias por descargar nuestra app!');
    window.location.href = this.getAttribute('href');
});
document.addEventListener("DOMContentLoaded", function() {
    // 1. Efecto de hover en la navegación
    const navItems = document.querySelectorAll('nav ul li a');

    navItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            item.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            item.style.borderRadius = '10px';
        });

        item.addEventListener('mouseout', function() {
            item.style.backgroundColor = 'transparent';
        });
    });

    // 2. Control del video de fondo en la sección "hero"
    const heroVideo = document.querySelector('.hero video');

    if (heroVideo) {
        heroVideo.play();
        
        // Opcional: Pausar el video cuando sale de la vista
        document.addEventListener('scroll', function() {
            const heroSection = document.querySelector('.hero');
            const bounding = heroSection.getBoundingClientRect();

            if (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            ) {
                heroVideo.play();
            } else {
                heroVideo.pause();
            }
        });
    }

    // 3. Rotación de testimonios (opcional)
    const testimonials = document.querySelectorAll('.testimonials p');
    let testimonialIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    if (testimonials.length > 0) {
        showTestimonial(testimonialIndex);
        setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            showTestimonial(testimonialIndex);
        }, 5000); // Cambia cada 5 segundos
    }

    // 4. Validación del formulario de contacto
    const contactForm = document.querySelector('.contact form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos.');
                event.preventDefault();
            } else if (!validateEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                event.preventDefault();
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // 5. Manejo de scroll para efectos visuales (opcional)
    const scrollElements = document.querySelectorAll('.scroll-effect');

    function elementInView(el, dividend = 1) {
        const elementTop = el.getBoundingClientRect().top;

        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    }

    function displayScrollElement(element) {
        element.classList.add('scrolled');
    }

    function handleScrollAnimation() {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        })
    }

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});
