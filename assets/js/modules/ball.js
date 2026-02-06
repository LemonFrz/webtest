/**
 * Interactive Bouncing Ball Module
 * Handles the physics-based ball that bounces around the screen
 */
function initBall() {
    const ball = document.getElementById('bouncing-ball');
    if (!ball) return;

    let ballX = window.innerWidth / 2 - 30; // Center horizontally
    let ballY = 200; // Start higher
    let velocityX = 0;
    let velocityY = 0;
    const gravity = 0.6;
    const damping = 0.92;
    const ballSize = 60;
    let isDragging = false;
    let dragStartX, dragStartY;
    let lastX, lastY;
    let hasInteracted = false; // Track if user has interacted
    let floatTime = 0; // For floating animation

    // Mouse drag
    ball.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Stop standard selection behavior
        isDragging = true;
        hasInteracted = true; // Activate gravity!
        document.body.classList.add('no-select'); // Prevent text highlighting
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
            document.body.classList.remove('no-select'); // Re-enable text highlighting
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
}
