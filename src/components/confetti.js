import confetti from "canvas-confetti";

export default function shootConfetti() {
    const end = Date.now() + (15 * 100);
    
    function frame() {
        // Shoot from left side
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 105,
            origin: { x: 0 },
        });
        
        // Shoot from right side
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 105,
            origin: { x: 1 },
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }

    frame();
}