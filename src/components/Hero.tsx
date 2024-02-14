"use client";
import i18n from "@/locales/home.json";
import { useState, useEffect } from "react";

import { Card } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { FaUserGraduate, FaUsers, FaLaptopCode } from "react-icons/fa";
import { Reveal } from "./ui/ScrollReveal";
import Link from "next/link";

export function Hero() {
	const [backgroundIndex, setBackgroundIndex] = useState(0);
	const [direction, setDirection] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setBackgroundIndex(
				(prevIndex) => (prevIndex + 1) % i18n.HERO.CARROUSEL.length,
			);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const imageVariants = {
		enter: (direction: number) => {
			return {
				x: direction > 0 ? "100%" : "-100%",
				opacity: 0,
			};
		},
		center: {
			x: "0%",
			opacity: 1,
		},
		exit: (direction: number) => {
			return {
				x: direction > 0 ? "-100%" : "100%",
				opacity: 0,
			};
		},
	};

	return (
		<section className="relative grid place-content-center max-w-screen min-h-[100vh] p-10 bg-primary/40 -top-28 !overflox-hidden">
			<AnimatePresence initial={true} custom={direction}>
				<motion.img
					aria-label="Imagen de campus del Politécnico."
					key={backgroundIndex}
					className="absolute inset-0 object-cover w-screen h-full bg-no-repeat bg-center -z-10"
					src={i18n.HERO.CARROUSEL[backgroundIndex]}
					custom={direction}
					variants={imageVariants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{ ease: "easeInOut", duration: 1 }}
					onAnimationComplete={() => setDirection(0)}
				/>
			</AnimatePresence>
			<Reveal>
				<div className="relative text-center text-white mt-36 sm:mt-16">
					<h1 className="md:text-6xl text-3xl font-bold mb-4 max-w-[25ch]">
						{i18n.HERO.TITLE}
					</h1>
					<p className="lg:text-xl text-md font-semibold mt-6">
						{i18n.HERO.SUB_TITLE}
					</p>
				</div>
				<div className="md:space-y-0 md:space-x-9 mt-12 flex flex-col md:flex-row justify-center items-center space-y-4 ">
					<Card
						radius="sm"
						className="flex flex-col justify-center items-center shadow-md w-[200px] h-[170px] text-center gap-4 bg-background hover:scale-95 transition-transform"
					>
						<FaUserGraduate className="text-3xl text-primary" />
						<p className="p-2">{i18n.HERO.GRADUATED}</p>
					</Card>

					<Card
						radius="sm"
						className="flex flex-col justify-center items-center shadow-md w-[200px] h-[170px] text-center gap-4 bg-background hover:scale-95 transition-transform"
					>
						<FaUsers className="text-3xl text-primary" />
						<p className="p-2">{i18n.HERO.USER}</p>
					</Card>

					<Card
						radius="sm"
						className="flex flex-col justify-center items-center shadow-md w-[200px] h-[170px] text-center gap-4 bg-background hover:scale-95 transition-transform"
					>
						<FaLaptopCode className="text-3xl text-primary" />
						<p className="p-2">{i18n.HERO.TECHNOLOGY}</p>
					</Card>
				</div>
			</Reveal>
		</section>
	);
}
