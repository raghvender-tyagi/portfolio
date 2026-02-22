(function () {
    const FleeDistance = 100;

    function init() {
        const sprites = document.querySelectorAll('.sprite');

        // Mouse Flee Interaction
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            sprites.forEach(sprite => {
                const rect = sprite.getBoundingClientRect();
                const spriteX = rect.left + rect.width / 2;
                const spriteY = rect.top + rect.height / 2;
                const dist = Math.sqrt(Math.pow(mouseX - spriteX, 2) + Math.pow(mouseY - spriteY, 2));

                if (dist < FleeDistance) {
                    sprite.classList.add('flee');
                } else {
                    sprite.classList.remove('flee');
                }
            });
        });
    }

    // Wait for content
    const observer = new MutationObserver((mutations, obs) => {
        const gameLayer = document.getElementById('game-layer');
        if (gameLayer) {
            init();
            obs.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
