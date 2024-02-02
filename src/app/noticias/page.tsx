/* eslint-disable @next/next/no-img-element */
"use client";
import { NewsCard } from "@/components/noticias/NewsCard";
import { Title } from "@/components/ui/Title";
import { Chip, Pagination } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsPage() {
	const [isLoaded, setIsLoaded] = useState(true);
	return (
		<main>
			<section className="grid relative place-content-center w-full min-h-[80vh] bg-primary/80 -top-32">
				<img
					className="absolute inset-0 object-cover w-full h-full bg-no-repeat bg-center -z-10"
					src={
						"https://cnnespanol.cnn.com/wp-content/uploads/2024/02/GettyImages-1969688477.jpg?quality=100&strip=info&w=460&h=260&crop=1"
					}
					alt="Noticias princiapl"
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
					className="flex flex-col items-center justify-center gap-4 text-white max-w-4xl"
				>
					<Chip size="lg" variant="bordered" className="mb-2 text-white">
						Categoria
					</Chip>
					<h1 className="md:text-7xl text-3xl font-bold mb-2 line-clamp-2">
						Noticia Principal
					</h1>
					<p className="text-md text-wrap max-w-full text-center px-20">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus id,
						eum quod quidem ipsum ad omnis pariatur rerum, minima vel delectus,
						optio commodi aliquam? Sapiente rerum sit fugiat nobis praesentium.
					</p>
				</motion.div>
			</section>
			<section className="max-w-7xl mx-auto -mt-20">
				<Title text="Todas las noticias" />

				<div className="min-h-[80vh] grid grid-cols-4 gap-4 pb-10">
					{Array.from({ length: 12 }, (_, index) => {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<NewsCard key={index} id={index.toString()} isLoaded={isLoaded} />
						);
					})}
				</div>
			</section>
			<section className="flex justify-center">
				<Pagination isDisabled={!isLoaded} size="lg" total={30} page={1} />
			</section>
		</main>
	);
}
