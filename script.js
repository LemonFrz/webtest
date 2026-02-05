document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

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
    const particleCount = window.innerWidth < 768 ? 60 : 300; // Count from user's last edit
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
                    // Original magnetism: repulsion/swirl. 
                    // To restore original feel:
                    const directionX = forceDirectionX * force * 2;
                    const directionY = forceDirectionY * force * 2;

                    this.x += directionX; // += pushes away/around
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

    // Smooth scroll fix
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
