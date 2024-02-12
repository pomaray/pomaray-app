/* eslint-disable @next/next/no-img-element */
"use client";
import { NewsCard } from "@/components/noticias/NewsCard";
import { Title } from "@/components/ui/Title";
import { Button, Pagination } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsPage() {
	const [isLoaded, setIsLoaded] = useState(false);
	return (
		<main>
			<section className="grid relative place-content-center w-full sm:min-h-[80vh] min-h-[100vh] bg-primary/80 -top-32">
				<img
					className="absolute inset-0 object-cover w-full h-full bg-no-repeat bg-center -z-10"
					src={
						"https://cnnespanol.cnn.com/wp-content/uploads/2024/02/GettyImages-1969688477.jpg?quality=100&strip=info&w=460&h=260&crop=1"
					}
					alt="Noticias principal"
				/>
				<motion.div
					initial={{
						translateY: 100,
						opacity: 0,
					}}
					animate={{
						translateY: 0,
						opacity: 1,
					}}
					className="flex flex-col items-center justify-center gap-4 text-white w-full max-w-4xl"
				>
					<h1 className="md:text-7xl text-3xl font-bold mb-2 text-center px-6">
						{"Cargando última noticia..."}
					</h1>

					<p className="text-md text-pretty text-center max-w-full sm:px-20 px-10">
						{}
					</p>

					<Button
						isLoading={!isLoaded}
						variant="faded"
						className="hover:scale-105 transition-transform"
					>
						Seguir leyendo
					</Button>
				</motion.div>
			</section>
			<section className="container mx-auto -mt-20">
				<Title text="Todas las noticias" />

				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:px-9 px-6">
					{Array.from({ length: 12 }, (_, index) => {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<NewsCard key={index} id={index.toString()} isLoaded={isLoaded} />
						);
					})}
				</div>
			</section>
			<section className="flex justify-center mt-10">
				<Pagination isDisabled={!isLoaded} size="lg" total={30} page={1} />
			</section>
		</main>
	);
}
