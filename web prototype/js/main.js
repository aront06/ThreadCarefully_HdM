// Thread Carefully - Interactive Scripts
// El propio gusano de seda baja del menú con animación al pasar el ratón

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. Silkworm Dropdown — worm descends to bottom of menu
    // =========================================================
    const silkwormUnit = document.querySelector('.silkworm-nav-unit');
    const silkwormBtn  = document.querySelector('.silkworm-btn-base');
    const worm         = document.querySelector('.silkworm-actor-mascot');
    const thread       = document.querySelector('.silkworm-drop-thread');
    const panel        = document.querySelector('.silkworm-dropdown-panel');

    let closeTimeout = null;
    let retractTimeout = null;
    let isOpen = false;

    /**
     * Measure how far the worm must fall so it ends up exactly
     * at the height of the Steam item (Wishlist on Steam),
     * without descending all the way down to the footer.
     */
    function getDropDistance() {
        const steamItem = panel ? panel.querySelector('.silkworm-drop-item:has(.steam-opt), .silkworm-drop-item:last-child') : null;
        if (!silkwormUnit) return 235;

        const unitRect = silkwormUnit.getBoundingClientRect();
        const buttonMidY = unitRect.top + unitRect.height / 2;

        if (steamItem) {
            const steamRect = steamItem.getBoundingClientRect();
            // Centrado verticalmente respecto al bloque de Steam
            const steamMidY = steamRect.top + steamRect.height / 2;
            return Math.round(steamMidY - buttonMidY);
        }

        // Fallback aproximado si no se encuentra
        return 235;
    }

    function openMenu() {
        if (retractTimeout) {
            clearTimeout(retractTimeout);
            retractTimeout = null;
        }
        silkwormUnit.classList.remove('is-retracting');

        if (isOpen) return;
        isOpen = true;

        silkwormUnit.classList.add('is-active');
        if (silkwormBtn) silkwormBtn.setAttribute('aria-expanded', 'true');

        // Medir de inmediato y aplicar la distancia de bajada fija al bloque steam
        const dist = getDropDistance();
        silkwormUnit.style.setProperty('--worm-drop-px', dist + 'px');
        thread.style.setProperty('--thread-height', dist + 'px');
    }

    function closeMenu() {
        if (!isOpen) return;
        isOpen = false;

        silkwormUnit.classList.remove('is-active');
        if (silkwormBtn) silkwormBtn.setAttribute('aria-expanded', 'false');

        // Activamos la animación gradual de repliegue hacia arriba
        silkwormUnit.classList.add('is-retracting');

        // El hilo se repliega a 0px mientras el gusano sube
        thread.style.setProperty('--thread-height', '0px');

        // Esperamos a que termine la subida (1.2s) para limpiar clases y variables
        if (retractTimeout) clearTimeout(retractTimeout);
        retractTimeout = setTimeout(() => {
            silkwormUnit.classList.remove('is-retracting');
            silkwormUnit.style.removeProperty('--worm-drop-px');
            thread.style.removeProperty('--thread-height');
            retractTimeout = null;
        }, 1250);
    }

    if (silkwormUnit) {
        // Hover open / close
        silkwormUnit.addEventListener('mouseenter', () => {
            if (closeTimeout) { clearTimeout(closeTimeout); closeTimeout = null; }
            openMenu();
        });

        silkwormUnit.addEventListener('mouseleave', () => {
            closeTimeout = setTimeout(() => closeMenu(), 250);
        });

        // Click / touch toggle
        if (silkwormBtn) {
            silkwormBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                isOpen ? closeMenu() : openMenu();
            });
        }

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!silkwormUnit.contains(e.target)) closeMenu();
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }


    // =========================================================
    // 2. FAQ Accordion Interaction (Sketch '+' toggle)
    // =========================================================
    const faqItems = document.querySelectorAll('.sketch-faq-item, .faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.sketch-faq-question, .faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isExpanded = item.classList.contains('active');
                if (isExpanded) {
                    item.classList.remove('active');
                    questionBtn.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('active');
                    questionBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });


    // =========================================================
    // 3. Hero Carousel Arrows (< and > from sketch image.png)
    // =========================================================
    const prevArrow = document.querySelector('.carousel-arrow.prev');
    const nextArrow = document.querySelector('.carousel-arrow.next');
    const mediaBox  = document.querySelector('.hero-media-box');

    const heroSlides = [
        { title: "Hero GIF / Video",    subtitle: "2.5D Physics-Based Tongue Swing Gameplay"      },
        { title: "Canopy Climber",       subtitle: "Precision Branch Balancing & Height Scaling"   },
        { title: "Rage Moments",         subtitle: "One Slip Sends You All The Way Down!"           }
    ];

    let currentSlide = 0;

    function updateSlide(direction) {
        if (!mediaBox) return;
        currentSlide = (currentSlide + direction + heroSlides.length) % heroSlides.length;
        const slide = heroSlides[currentSlide];
        const h3 = mediaBox.querySelector('h3');
        const p  = mediaBox.querySelector('p');
        if (h3) h3.textContent = slide.title;
        if (p)  p.textContent  = slide.subtitle;
        mediaBox.style.transform = 'scale(0.98)';
        setTimeout(() => { mediaBox.style.transform = ''; }, 150);
    }

    if (prevArrow) prevArrow.addEventListener('click', () => updateSlide(-1));
    if (nextArrow) nextArrow.addEventListener('click', () => updateSlide(1));
});
