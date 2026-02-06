document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // --------------------------------------------------------
    // TYPEWRITER ANIMATION (>//<!)
    // --------------------------------------------------------
    const typewriterElement = document.getElementById('header-typewriter');
    const textToType = " Hola Mi Amigos. . . >//<!";
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
    // GSAP SCROLL ANIMATIONS
    // --------------------------------------------------------
    if (false && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Fade-up animation for all reveal elements
        gsap.utils.toArray('.reveal').forEach((element) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 50,
                duration: 1,
                ease: "power3.out"
            });
        });

        // Stagger animation for project cards
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.project-grid',
                start: "top 80%"
            },
            y: 60,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out"
        });

        // Hero text animation
        gsap.from('.hero h1', {
            y: 30,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
        });

        gsap.from('.hero .lead', {
            y: 20,
            duration: 0.8,
            delay: 0.6,
            ease: "power2.out"
        });
    }

    // --------------------------------------------------------
    // PARTICLE CONSTELLATION BACKGROUND
    // --------------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = 120;
    const connectionDistance = 150; // Distance to draw lines between particles
    const mouse = { x: null, y: null, radius: 120 };

    // Create particles
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.size = Math.random() * 1.5 + 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around edges
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 0, 110, 0.6)'; // Pink particles
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Mouse tracking
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Resize handler
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.25;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 0, 110, ${opacity})`; // Pink lines
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Mouse interaction - connect to nearby particles
        if (mouse.x != null) {
            particles.forEach(p => {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const opacity = (1 - distance / mouse.radius) * 0.6;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 0, 110, ${opacity})`; // Pink cursor lines
                    ctx.lineWidth = 1;
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(p.x, p.y);
                    ctx.stroke();
                }
            });
        }

        requestAnimationFrame(animate);
    }
    animate();

    // --------------------------------------------------------
    // CUSTOM CURSOR
    // --------------------------------------------------------
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');


    // Mouse move tracking - instant, centered on cursor
    document.addEventListener('mousemove', (e) => {
        if (cursorDot) {
            // Center dot (8px width) by offsetting -4px
            cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        }
        if (cursorRing) {
            // Center ring (40px width) by offsetting -20px
            cursorRing.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
        }
    });



    // Expand ring on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorRing) cursorRing.classList.add('expand');
        });
        el.addEventListener('mouseleave', () => {
            if (cursorRing) cursorRing.classList.remove('expand');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        if (cursorDot) cursorDot.style.opacity = '0';
        if (cursorRing) cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        if (cursorDot) cursorDot.style.opacity = '1';
        if (cursorRing) cursorRing.style.opacity = '0.5';
    });

    //--------------------------------------------------------
    // PROJECT CARDS - 3D TILT
    //--------------------------------------------------------
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 8,              // Reduced from 15 - gentler tilt
            scale: 1.02,
            glare: true,
            "max-glare": 0.15    // Subtle glare
        });
    }

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
            modalDesc.innerText = desc;
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

// --------------------------------------------------------
// SCROLL PROGRESS BAR
// --------------------------------------------------------
const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    if (progressBar) {
        progressBar.style.width = scrollPercentage + '%';
    }
});

// --------------------------------------------------------
// INTERACTIVE BOUNCING BALL
// --------------------------------------------------------
const ball = document.getElementById('bouncing-ball');
let ballX = window.innerWidth / 2 - 30;  // Center horizontally
let ballY = 200;                          // Start higher
let velocityX = 0;
let velocityY = 0;
const gravity = 0.6;
const damping = 0.92;
const ballSize = 60;
let isDragging = false;
let dragStartX, dragStartY;
let lastX, lastY;
let hasInteracted = false;  // Track if user has interacted
let floatTime = 0;          // For floating animation

// Mouse drag
ball.addEventListener('mousedown', (e) => {
    isDragging = true;
    hasInteracted = true;  // Activate gravity!
    dragStartX = e.clientX - ballX;
    dragStartY = e.clientY - ballY;
    lastX = e.clientX;
    lastY = e.clientY;
    velocityX = 0;
    velocityY = 0;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const newX = e.clientX - dragStartX;
        const newY = e.clientY - dragStartY;

        // Calculate velocity from movement
        velocityX = (newX - ballX) * 0.8;
        velocityY = (newY - ballY) * 0.8;

        ballX = newX;
        ballY = newY;
        lastX = e.clientX;
        lastY = e.clientY;
    }
});

document.addEventListener('mouseup', (e) => {
    if (isDragging) {
        isDragging = false;
        // Keep the velocity from dragging (already calculated in mousemove)
        // Multiply for extra throw power
        velocityX *= 1.5;
        velocityY *= 1.5;
    }
});

// Physics
function updateBall() {
    if (!isDragging) {
        if (!hasInteracted) {
            // Gentle floating
            floatTime += 0.02;
            ballY = 200 + Math.sin(floatTime) * 30;
            ballX = window.innerWidth / 2 - 30 + Math.cos(floatTime * 0.7) * 50;
        } else {
            velocityY += gravity;
            ballX += velocityX;
            ballY += velocityY;

            // Walls
            if (ballX <= 0 || ballX >= window.innerWidth - ballSize) {
                velocityX *= -damping;
                ballX = ballX <= 0 ? 0 : window.innerWidth - ballSize;
            }

            // Floor/ceiling
            if (ballY <= 0 || ballY >= window.innerHeight - ballSize) {
                velocityY *= -damping;
                ballY = ballY <= 0 ? 0 : window.innerHeight - ballSize;

                if (Math.abs(velocityY) < 1 && ballY >= window.innerHeight - ballSize) {
                    velocityY = 0;
                }
            }

            // Friction
            if (ballY >= window.innerHeight - ballSize - 1) {
                velocityX *= 0.98;
            }
        }
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    requestAnimationFrame(updateBall);
}

updateBall();

