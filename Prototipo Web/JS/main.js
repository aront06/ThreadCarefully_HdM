// Thread Carefully - Interactive Scripts
// El propio gusano de seda baja del menú con animación al pasar el ratón

document.addEventListener('DOMContentLoaded', () => {
    // 1. Silkworm Dropdown Unit (Gusano de Seda animado)
    const silkwormUnit = document.querySelector('.silkworm-nav-unit');
    const silkwormBtn = document.querySelector('.silkworm-btn-base');
    let closeTimeout = null;

    if (silkwormUnit) {
        // Al pasar el ratón: se activa de inmediato y el gusano se deja caer
        silkwormUnit.addEventListener('mouseenter', () => {
            if (closeTimeout) clearTimeout(closeTimeout);
            silkwormUnit.classList.add('is-active');
            if (silkwormBtn) silkwormBtn.setAttribute('aria-expanded', 'true');
        });

        // Al retirar el ratón: margen de gracia para que no se cierre bruscamente
        silkwormUnit.addEventListener('mouseleave', () => {
            closeTimeout = setTimeout(() => {
                silkwormUnit.classList.remove('is-active');
                if (silkwormBtn) silkwormBtn.setAttribute('aria-expanded', 'false');
            }, 250);
        });

        // Soporte táctil / clic
        if (silkwormBtn) {
            silkwormBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = silkwormUnit.classList.contains('is-active');
                if (isActive) {
                    silkwormUnit.classList.remove('is-active');
                    silkwormBtn.setAttribute('aria-expanded', 'false');
                } else {
                    silkwormUnit.classList.add('is-active');
                    silkwormBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!silkwormUnit.contains(e.target)) {
                silkwormUnit.classList.remove('is-active');
                if (silkwormBtn) silkwormBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && silkwormUnit.classList.contains('is-active')) {
                silkwormUnit.classList.remove('is-active');
                if (silkwormBtn) silkwormBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 2. FAQ Accordion Interaction (Sketch '+' toggle)
    const faqItems = document.querySelectorAll('.sketch-faq-item, .faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.sketch-faq-question, .faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Toggle current item
                if (isOpen) {
                    item.classList.remove('active');
                    questionBtn.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('active');
                    questionBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    // 3. Hero Carousel Arrows (< and > from sketch image.png)
    const prevArrow = document.querySelector('.carousel-arrow.prev');
    const nextArrow = document.querySelector('.carousel-arrow.next');
    const mediaBox = document.querySelector('.hero-media-box');

    const heroSlides = [
        {
            title: "Hero GIF / Video",
            subtitle: "2.5D Physics-Based Tongue Swing Gameplay"
        },
        {
            title: "Canopy Climber",
            subtitle: "Precision Branch Balancing & Height Scaling"
        },
        {
            title: "Rage Moments",
            subtitle: "One Slip Sends You All The Way Down!"
        }
    ];

    let currentSlide = 0;

    function updateSlide(direction) {
        if (!mediaBox) return;
        currentSlide = (currentSlide + direction + heroSlides.length) % heroSlides.length;
        const slide = heroSlides[currentSlide];
        const h3 = mediaBox.querySelector('h3');
        const p = mediaBox.querySelector('p');
        if (h3) h3.textContent = slide.title;
        if (p) p.textContent = slide.subtitle;

        // Visual flash effect
        mediaBox.style.transform = 'scale(0.98)';
        setTimeout(() => {
            mediaBox.style.transform = '';
        }, 150);
    }

    if (prevArrow) {
        prevArrow.addEventListener('click', () => updateSlide(-1));
    }
    if (nextArrow) {
        nextArrow.addEventListener('click', () => updateSlide(1));
    }
});
