"use client";

// REACT Y LOCALES
import { useEffect, useState } from "react";
import LOCAL from "@/locales/home.json";

// COMPONENTES DE @NEXT_UI
import { Card } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/react";

// COMPONENTES DE /components
import { Section, SectionTitle } from "@/components/ui/Section";
import { Collage, type CollageContent } from "@/components/Collage";

// ICONOS Y EXTAS
import { FaUserGraduate, FaUsers, FaLaptopCode } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

export default function HomePage() {
	const [backgroundIndex, setBackgroundIndex] = useState(0);
	const [direction, setDirection] = useState(1);

	// SHORT-CUTS DE LOCALES
	const VIDA_CULTURA_SUBTITULO = LOCAL.VIDA_Y_CULTURA.SUB_TITULO.split("%s");
	const MEDIDAS_DE_SEGURIDAD_SUBTITULO =
		LOCAL.MEDIDAS_DE_SEGURIDAD.SUB_TITULO.split("%s");
	const contentSections: CollageContent[] = LOCAL.MEDIDAS_DE_SEGURIDAD.COLLAGE;

	useEffect(() => {
		const interval = setInterval(() => {
			setBackgroundIndex(
				(prevIndex) => (prevIndex + 1) % LOCAL.HERO.CARUSEL.length,
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
		<main>
			<section className="grid relative place-content-center  w-full min-h-[100vh] p-10 bg-primary/80 -top-10">
				<AnimatePresence initial={false} custom={direction}>
					<motion.img
						key={backgroundIndex}
						className="absolute inset-0 object-cover w-full h-full bg-no-repeat bg-center -z-10"
						src={LOCAL.HERO.CARUSEL[backgroundIndex]}
						custom={direction}
						variants={imageVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ ease: "easeInOut", duration: 1 }}
						onAnimationComplete={() => setDirection(0)}
					/>
				</AnimatePresence>
				<div className="relative text-center mt-30 text-white mt-10 sm:mt-0">
					<h1 className="md:text-5xl text-3xl font-bold mb-4 max-w-[20ch]">
						{LOCAL.HERO.TITULO}
					</h1>
					<p className="lg:text-lg text-md font-semibold mt-6">
						{LOCAL.HERO.SUB_TITULO}
					</p>
				</div>
				<div className="mt-12 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-9">
					<Card className="flex flex-col justify-center items-center shadow-md w-[200px] h-[170px] text-center gap-4 bg-background">
						<FaUserGraduate className="text-3xl text-primary" />
						<p className="p-2">{LOCAL.HERO.GRADUADO}</p>
					</Card>
					<Card className="flex flex-col justify-center items-center shadow-md w-[200px] h-[170px] text-center gap-4 bg-background">
						<FaUsers className="text-3xl text-primary" />
						<p className="p-2">{LOCAL.HERO.USUARIO}</p>
					</Card>
					<Card className="flex flex-col justify-center items-center shadow-md w-[200px] h-[170px] text-center gap-4 bg-background">
						<FaLaptopCode className="text-3xl text-primary" />
						<p className="p-2">{LOCAL.HERO.TECNOLOGIA}</p>
					</Card>
				</div>
			</section>

			<Section className="container mx-auto py-12 text-center text-foreground">
				<div className="sm:px-12 px-6">
					<SectionTitle text={LOCAL.MEDIDAS_DE_SEGURIDAD.TITULO} />
					<p className="sm:text-lg text-sm mt-4 mx-auto max-w-[75ch] my-12">
						{MEDIDAS_DE_SEGURIDAD_SUBTITULO[0]}
						<Link className="sm:text-lg text-sm" href="/nosotros#seguridad">
							{LOCAL.MEDIDAS_DE_SEGURIDAD.SUB_TITULO_LINK}
						</Link>
						{MEDIDAS_DE_SEGURIDAD_SUBTITULO[1]}
					</p>
				</div>
				<Collage contentSections={contentSections} />
			</Section>

			<Section className="h-full flex flex-col justify-center items-center gap-20">
				<SectionTitle withLine className="py-12" text={LOCAL.NOTICIAS.TITULO} />
				<div className="flex flex-row flex-wrap justify-center min-h-[50vh]">
					{<Spinner label={LOCAL.NOTICIAS.CARGANDO} />}
				</div>
				<a href="/noticias">
					<Button color="primary">{LOCAL.NOTICIAS.LEER_BOTON}</Button>
				</a>
			</Section>

			<Section className="text-center pb-20">
				<SectionTitle withLine text={LOCAL.UBICACION.TITULO} />
				<div className="mx-auto w-4/5">
					<iframe
						title="Ubicación"
						className="w-full h-[60vh] rounded-lg"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.213641194164!2d-69.99740142496333!3d18.473979582610603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf8a793d63f471%3A0xf12da92c55cac14b!2sMadre%20Rafaela%20Ybarra%20Polytecniquenic!5e0!3m2!1sen!2sdo!4v1700580333116!5m2!1sen!2sdo"
						allowFullScreen
					/>
				</div>
			</Section>

			<Section className="flex flex-col justify-center items-center py-5 sm:px-10 md:px-40 px-6">
				<SectionTitle className="py-4" text={LOCAL.VIDA_Y_CULTURA.TITULO} />
				<p className="text-foreground">
					{VIDA_CULTURA_SUBTITULO[0]}{" "}
					<Link
						className="underline text - white"
						href={LOCAL.VIDA_Y_CULTURA.HASHTAG_LINK}
					>
						{LOCAL.VIDA_Y_CULTURA.HASHTAG}
					</Link>{" "}
					{VIDA_CULTURA_SUBTITULO[1]}
				</p>
				<div className="flex flex-col justify-center min-h-[50vh]">
					<Spinner label={LOCAL.VIDA_Y_CULTURA.CARGANDO} />
				</div>
			</Section>
		</main>
	);
}
