/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface RevealProps {
	children: React.ReactNode;
}

export function Reveal({ children }: RevealProps) {
	const ref = useRef(null);
	const isInWindow = useInView(ref, {
		once: true,
	});

	const animationControls = useAnimation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isInWindow) {
			animationControls.start("visible");
		}
	}, [isInWindow]);

	return (
		<div ref={ref} className="relative w-full overflow-hidden ">
			<motion.div
				variants={{
					hidden: { translateY: 200, opacity: 0 },
					visible: { translateY: 0, opacity: 1 },
				}}
				initial="hidden"
				animate={animationControls}
				transition={{ duration: 0.3, delay: 0.3 }}
			>
				{children}
			</motion.div>
		</div>
	);
}
