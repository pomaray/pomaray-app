"use client";

import { useEffect, useState } from "react";
import { Card } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Button, Image } from "@nextui-org/react";

import { Title } from "@/components/ui/Title";
import { Collage, type CollageContent } from "@/components/Collage";
import { FaUserGraduate, FaUsers, FaLaptopCode } from "react-icons/fa";
import { AnimatePresence, AnimationProps, motion } from "framer-motion";
import i18n from "@/locales/home.json";
import { NewsCard } from "@/components/noticias/NewsCard";

export default function HomePage() {
	const [backgroundIndex, setBackgroundIndex] = useState(0);
	const [direction, setDirection] = useState(1);

	// SHORT-CUTS DE LOCALES
	const VIDA_CULTURA_SUBTITULO = i18n.LIFE_AND_CULTURE.SUB_TITLE.split("%s");
	const MEDIDAS_DE_SEGURIDAD_SUBTITULO =
		i18n.SECURITY_MEASURES.SUB_TITLE.split("%s");
	const contentSections: CollageContent[] = i18n.SECURITY_MEASURES.COLLAGE;

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

	const cardAnimation = {
		initial: { y: -120 },
		animate: { y: 0 },
	};

	return (
		<main>
			<section className="grid relative place-content-center  w-full min-h-[100vh] p-10 bg-primary/80 -top-32">
				<AnimatePresence initial={true} custom={direction}>
					<motion.img
						key={backgroundIndex}
						className="absolute inset-0 object-cover w-full h-full bg-no-repeat bg-center -z-10"
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
				<motion.div
					initial={{
						translateY: 100,
						opacity: 0,
					}}
					animate={{
						translateY: 0,
						opacity: 1,
					}}
					className="relative text-center mt-30 text-white mt-10 sm:mt-0"
				>
					<h1 className="md:text-5xl text-3xl font-bold mb-4 max-w-[20ch]">
						{i18n.HERO.TITLE}
					</h1>
					<p className="lg:text-lg text-md font-semibold mt-6">
						{i18n.HERO.SUB_TITLE}
					</p>
				</motion.div>
				<motion.div
					initial={{
						translateY: 100,
						opacity: 0,
					}}
					animate={{
						translateY: 0,
						opacity: 1,
					}}
					className="mt-12 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-9"
				>
					<Card className="flex flex-col justify-center items-center shadow-md w-[200px] h-[170px] text-center gap-4 bg-background dark:bg-default-200">
						<FaUserGraduate className="text-3xl text-primary" />
						<p className="p-2">{i18n.HERO.GRADUATED}</p>
					</Card>

					<Card className="flex flex-col justify-center items-center shadow-md w-[200px] h-[170px] text-center gap-4 bg-background dark:bg-default-200">
						<FaUsers className="text-3xl text-primary" />
						<p className="p-2">{i18n.HERO.USUER}</p>
					</Card>

					<Card className="flex flex-col justify-center items-center shadow-md w-[200px] h-[170px] text-center gap-4 bg-background dark:bg-default-200">
						<FaLaptopCode className="text-3xl text-primary" />
						<p className="p-2">{i18n.HERO.TECHNOLOGY}</p>
					</Card>
				</motion.div>
			</section>

			<section className="container mx-auto pb-12 text-center text-foreground">
				<div className="sm:px-12 px-6">
					<Title text={i18n.SECURITY_MEASURES.TITLE} />
					<p className="sm:text-lg text-sm mt-4 mx-auto max-w-[75ch] my-12">
						{MEDIDAS_DE_SEGURIDAD_SUBTITULO[0]}
						<Link className="sm:text-lg text-sm" href="/nosotros#seguridad">
							{i18n.SECURITY_MEASURES.SUB_TITLE_LINK}
						</Link>
						{MEDIDAS_DE_SEGURIDAD_SUBTITULO[1]}
					</p>
				</div>
				<Collage contentSections={contentSections} />
			</section>

			<section className="h-full flex flex-col justify-center items-center gap-10 xl:px-0 px-20 mx-auto max-w-7xl">
				<Title withLine  text={i18n.NEWS.TITLE} />
				<div className="text-primary relative">
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
						{Array.from({ length: 4 }, (_, index) => {
							return (
								<NewsCard
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									id={index.toString()}
									isLoaded={true}
								/>
							);
						})}
					</div>
				</div>
				<a href="/noticias">
					<Button color="primary">{i18n.NEWS.READ_BTN}</Button>
				</a>
			</section>

			<section id="ubicacion" className="text-center pb-20">
				<Title withLine text={i18n.LOCATION.TITLE} />
				<div className="mx-auto px-20">
					<iframe
						title="Ubicación"
						className="w-full h-[60vh] rounded-lg"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.213641194164!2d-69.99740142496333!3d18.473979582610603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf8a793d63f471%3A0xf12da92c55cac14b!2sMadre%20Rafaela%20Ybarra%20Polytecniquenic!5e0!3m2!1sen!2sdo!4v1700580333116!5m2!1sen!2sdo"
						allowFullScreen
					/>
				</div>
			</section>

			<section className="flex flex-col justify-center items-center max-w-7xl px-20																													 mx-auto">
				<Title className="py-4" text={i18n.LIFE_AND_CULTURE.TITLE} />
				<p className="text-foreground">
					{VIDA_CULTURA_SUBTITULO[0]}{" "}
					<Link
						className="underline text-primary"
						href={i18n.LIFE_AND_CULTURE.HASHTAG_LINK}
					>
						{i18n.LIFE_AND_CULTURE.HASHTAG}
					</Link>{" "}
					{VIDA_CULTURA_SUBTITULO[1]}
				</p>
				<div className="grid grid-cols-12 gap-4 min-h-[50vh] mt-6 w-full">
					{i18n.LIFE_AND_CULTURE.IMAGES.map((image, index) => (
						<Card
							shadow="none"
							key={image.trim()}
							className="lg:col-span-4 sm:col-span-6 col-span-12 h-[300px]"
						>
							<Image
								removeWrapper
								alt={`Vida y cultura imagen ${index + 1}`}
								className="z-0 w-full h-full object-cover hover:scale-125 transition-transform"
								src={image}
								loading="lazy"
							/>
						</Card>
					))}
				</div>
			</section>
		</main>
	);
}
