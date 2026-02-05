document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // --------------------------------------------------------
    // TYPEWRITER ANIMATION (>//<!)
    // --------------------------------------------------------
    const typewriterElement = document.getElementById('header-typewriter');
    const textToType = " Hola Mi Amor. . . >//<!";
    let isDeleting = false;
    let charIndex = 0;

    function typeEffect() {
        if (!typewriterElement) return;

        const currentText = textToType.substring(0, charIndex);
        typewriterElement.textContent = currentText;

        let typeSpeed = 200; // Normal typing speed

        if (isDeleting) {
            typeSpeed = 100; // Deleting speed
            charIndex--;
        } else {
            charIndex++;
        }

        // State transitions
        if (!isDeleting && charIndex === textToType.length + 1) {
            // Finished typing, pause before delete
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
            charIndex--; // Fix index overshoot
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, pause before re-type
            isDeleting = false;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start Typewriter
    typeEffect();

    // --------------------------------------------------------
    // SCROLL REVEAL ANIMATION
    // --------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(element => revealObserver.observe(element));

    // --------------------------------------------------------
    // PARTICLE SYSTEM (Reverted to Floating Chaos)
    // --------------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = window.innerWidth < 768 ? 60 : 300;
    const mouseParams = { x: null, y: null, radius: 150 };

    // Resize handling
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', () => {
        resize();
        initParticles(); // Re-init to avoid stretching
    });
    resize();

    // Mouse/Touch Interaction
    window.addEventListener('mousemove', (e) => {
        mouseParams.x = e.x;
        mouseParams.y = e.y;
    });

    // Touch support
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouseParams.x = e.touches[0].clientX;
            mouseParams.y = e.touches[0].clientY;
        }
    });

    window.addEventListener('mouseout', () => {
        mouseParams.x = null;
        mouseParams.y = null;
    });

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Slow velocity
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1; // Size 1-3px
        }

        update() {
            // Move
            this.x += this.vx;
            this.y += this.vy;

            // Mouse Repulsion/Attraction (Magnetism)
            if (mouseParams.x != null) {
                let dx = mouseParams.x - this.x;
                let dy = mouseParams.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseParams.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseParams.radius - distance) / mouseParams.radius;

                    const directionX = forceDirectionX * force * 2;
                    const directionY = forceDirectionY * force * 2;

                    this.x += directionX;
                    this.y += directionY;
                }
            }

            // Boundary wrap
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

            // Fixed Dark Mode Color
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';

            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    // --------------------------------------------------------
    // PROJECT MODAL LOGIC
    // --------------------------------------------------------
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelectorAll('.modal-close');
    const projectCards = document.querySelectorAll('.project-card');

    // Elements to populate
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');

    // Open Modal
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Get Content
            const title = card.querySelector('.project-title').innerText;
            const desc = card.querySelector('.project-desc').innerText;
            const tags = card.querySelector('.tags').innerHTML;
            const imgPath = card.getAttribute('data-image'); // Get Image Path

            // Set Content
            modalTitle.innerText = title;
            modalDesc.innerText = desc + " (Full case study content would go here. You can add more text, images, or even embed a video in this modal!)";
            modalTags.innerHTML = tags;

            // Set Image
            const visualPlaceholder = document.querySelector('.modal-visual-placeholder');
            if (imgPath) {
                // Use the cat image
                visualPlaceholder.innerHTML = `<img src="${imgPath}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px; display: block;">`;
                visualPlaceholder.style.border = 'none'; // Remove dashed border
            } else {
                // Default placeholder
                visualPlaceholder.innerHTML = `<span>Project Preview / Video Area</span>`;
                visualPlaceholder.style.border = '1px dashed rgba(255,255,255,0.1)';
            }

            // Show Modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock Body Scroll
        });
    });

    // Close Modal Function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock Body Scroll
    }

    // Close Listeners
    modalClose.forEach(btn => btn.addEventListener('click', closeModal));

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Smooth scroll fix (Navigation)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
