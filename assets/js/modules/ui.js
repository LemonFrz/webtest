/**
 * UI Interaction Module
 * Handles general UI logic like modals, typewriter effect, scroll progress, etc.
 */
function initUI() {
    // Dynamic Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initTypewriter();
    initScrollProgress();
    initModals();
    initSmoothScroll();
    initTilt();
}

function initTypewriter() {
    const typewriterElement = document.getElementById('header-typewriter');
    if (!typewriterElement) return;

    const textToType = " Hola Mi Amigos. . . >//<!";
    let isDeleting = false;
    let charIndex = 0;

    function typeEffect() {
        if (!typewriterElement) return;

        const currentText = textToType.substring(0, charIndex);
        typewriterElement.textContent = currentText;

        let typeSpeed = 200;

        if (isDeleting) {
            typeSpeed = 100;
            charIndex--;
        } else {
            charIndex++;
        }

        if (!isDeleting && charIndex === textToType.length + 1) {
            isDeleting = true;
            typeSpeed = 2000;
            charIndex--;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();
}

function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });
}

function initModals() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const modalClose = document.querySelectorAll('.modal-close');
    const projectCards = document.querySelectorAll('.project-card');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const visualPlaceholder = document.querySelector('.modal-visual-placeholder');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.project-title').innerText;
            const desc = card.querySelector('.project-desc').innerText;
            const tags = card.querySelector('.tags').innerHTML;
            const imgPath = card.getAttribute('data-image');

            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            modalTags.innerHTML = tags;

            if (imgPath && visualPlaceholder) {
                visualPlaceholder.innerHTML = `<img src="${imgPath}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px; display: block;">`;
                visualPlaceholder.style.border = 'none';
            } else if (visualPlaceholder) {
                visualPlaceholder.innerHTML = `<span>Project Preview / Video Area</span>`;
                visualPlaceholder.style.border = '1px dashed rgba(255,255,255,0.1)';
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.forEach(btn => btn.addEventListener('click', closeModal));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initTilt() {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 8,
            scale: 1.02,
            glare: true,
            "max-glare": 0.15
        });
    }
}
