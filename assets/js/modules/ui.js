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
    initSmoothScroll();
    initTilt();
    initChaos();
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

function initChaos() {
    const chaosBtn = document.getElementById('chaos-btn');
    if (!chaosBtn) return;

    let isChaos = false;
    let isFixing = false;

    chaosBtn.addEventListener('click', () => {
        if (isFixing) return; // Prevent clicking during fix animation

        isChaos = !isChaos;

        if (isChaos) {
            document.body.classList.add('chaos-mode');
            chaosBtn.textContent = '🔧 Fix it!';
            chaosBtn.style.background = 'radial-gradient(circle at 30% 30%, #00ff00, #00cc00)';

            // Screen shake effect - animate main content, not body
            const hero = document.querySelector('.hero');
            if (hero) {
                let shakeCount = 0;
                const shakeInterval = setInterval(() => {
                    hero.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                    shakeCount++;
                    if (shakeCount > 15) {
                        clearInterval(shakeInterval);
                        hero.style.transform = 'translate(0, 0)';
                    }
                }, 50);
            }

        } else {
            // Start fixing animation
            isFixing = true;
            document.body.classList.remove('chaos-mode');
            document.body.classList.add('fixing-mode');
            chaosBtn.textContent = '⚙️ Fixing...';
            chaosBtn.style.background = 'radial-gradient(circle at 30% 30%, #ff9500, #ff6b00)';
            chaosBtn.style.pointerEvents = 'none'; // Disable during animation

            // Visual repair effect - sparkle flash
            document.body.style.animation = 'flash 0.3s ease-out';

            // After animation completes, restore normal state
            setTimeout(() => {
                document.body.classList.remove('fixing-mode');
                document.body.style.animation = '';
                chaosBtn.innerHTML = 'CHAOS<br>MODE';
                chaosBtn.style.background = 'radial-gradient(circle at 30% 30%, #ff1744, #ff006e)';
                chaosBtn.style.pointerEvents = 'auto';
                isFixing = false;
            }, 1500);
        }
    });
}
