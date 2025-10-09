export default function confetti() {
    const end = Date.now() + (15 * 100);
    
    function frame() {
        // Shoot from left side
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
        });
        
        // Shoot from right side
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }

    frame();
}