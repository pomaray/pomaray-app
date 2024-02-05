import confetti from "canvas-confetti";

interface ConfettiOptions {
	startVelocity: number;
	spread: number;
	ticks: number;
	zIndex: number;
}

function randomInRange(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

export function createConfetti(duration: number): void {
	const animationEnd = Date.now() + duration;
	const defaults: ConfettiOptions = {
		startVelocity: 30,
		spread: 360,
		ticks: 60,
		zIndex: 0,
	};

	const interval = setInterval(() => {
		const timeLeft = animationEnd - Date.now();

		if (timeLeft <= 0) {
			clearInterval(interval);
			return;
		}

		const particleCount = 50 * (timeLeft / duration);
		// since particles fall down, start a bit higher than random
		confetti({
			...defaults,
			particleCount,
			origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
		});
		confetti({
			...defaults,
			particleCount,
			origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
		});
	}, 250);
}
