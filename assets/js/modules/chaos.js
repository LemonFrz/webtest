/**
 * Easter Egg Chaos Module
 * Handles the visual "break" effect toggle
 */
function initChaos() {
    const chaosBtn = document.getElementById('chaos-btn');
    if (!chaosBtn) return;

    let isChaos = false;

    chaosBtn.addEventListener('click', () => {
        isChaos = !isChaos;

        if (isChaos) {
            document.body.classList.add('chaos-mode');
            chaosBtn.textContent = 'Fix it!';
            chaosBtn.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';

            // Add random screen shake
            let shakeCount = 0;
            const shakeInterval = setInterval(() => {
                document.body.style.transform = `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)`;
                shakeCount++;
                if (shakeCount > 20) {
                    clearInterval(shakeInterval);
                    document.body.style.transform = 'translate(0, 0)';
                }
            }, 50);

        } else {
            document.body.classList.remove('chaos-mode');
            chaosBtn.textContent = 'Click Me!';
            chaosBtn.style.background = 'linear-gradient(135deg, #ff006e, #ff1744)';
            document.body.style.transform = 'translate(0, 0)';
        }
    });
}
