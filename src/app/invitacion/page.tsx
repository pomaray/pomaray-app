/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import Logo from "@/components/ui/Logo";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { PiConfetti } from "react-icons/pi";
import { useEffect, useState } from "react";
import { createConfetti } from "@/utils/confetti";

export default function EventoComponent() {
	const currentDate = new Date();
	const targetDate = new Date("2024-02-14");

	const diffInMilliseconds = Math.floor(
		targetDate.getTime() - currentDate.getTime(),
	);
	const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
	const calculatedDays = Math.floor(diffInSeconds / (60 * 60 * 24));
	const [isAccepted, setIsAccepted] = useState(false);

	useEffect(() => {
		const local = localStorage.getItem("aniversario");
		if (local === "true") {
			setIsAccepted(true);
			return;
		}

		console.log(Boolean(local), isAccepted);

		setIsAccepted(false);
		localStorage.setItem("aniversario", String(false));
	}, [isAccepted]);

	return (
		<motion.main
			initial={{
				translateY: 100,
				opacity: 0,
			}}
			animate={{
				translateY: 0,
				opacity: 1,
			}}
			className="max-w-7xl mx-auto min-h-[80vh] flex justify-center sm:px-20 px-4 text-center"
		>
			<div className="relative flex flex-col justify-start items-center w-full  border-2 border-primary px-10 py-10">
				<div className="grid place-content-center w-full">
					<Logo className="m-auto fill-primary" width={140} />
				</div>
				<div className="grid place-content-center w-full min-h-40 gap-y-6">
					<h1 className="text-5xl">Aniversario Pomaray</h1>
					<p>14 de Febrero de 2024</p>
				</div>
				<div className="grid place-content-center w-full h-fit">
					<h2 className="text-xl">Te invitamos a nuestro aniversario </h2>
					<span className="text-primary text-7xl font-bold py-3 hover:scale-110 scale-100 transition-transform">
						46
					</span>
				</div>
				<div className="grid place-content-center w-full h-fit py-6">
					<Button
						aria-label="Aceptar invitación de aniversario"
						color="primary"
						onClick={() => {
							createConfetti(10000);
							setIsAccepted(true);
							localStorage.setItem("aniversario", String(true));
						}}
						isDisabled={isAccepted}
					>
						<PiConfetti />{" "}
						{isAccepted ? "Ya ha aceptado." : "Aceptar Invitación."}
					</Button>
				</div>
				<div className="grid place-content-center w-full place-self-end">
					<p>
						Te esperamos en {calculatedDays + 1} Dia en el{" "}
						<span className="text-focus underline">Auditorio</span> del
						Politécnico.
					</p>
				</div>
				<img
					src="/QR.png"
					width={100}
					className="lg:absolute right-5 bottom-5 lg:my-0 my-6"
					alt="Código QR de invitación."
				/>
			</div>
		</motion.main>
	);
}
