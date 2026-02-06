/**
 * Custom Cursor Module
 * Handles the custom dot and ring cursor logic
 */
function initCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    // Mobile check - don't init on touch devices (simple check)
    if (window.matchMedia("(max-width: 768px)").matches) return;

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
}
