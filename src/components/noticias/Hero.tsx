import { Button, Image } from "@nextui-org/react";
import { section } from "@/components/ui/section";

export function HeroNoticias() {
	const TITLE = "Hero Noticias";
	return (
		<section className="grid relative place-content-center w-full h-[80vh] p-10 bg-red-500 -top-10">
			<Image
				src="/images/hero1.jpg"
				alt={TITLE}
				className="absolute inset-0 object-cover w-full h-full bg-no-repeat bg-center -z-10"
			/>
			<div className="relative text-center mt-30 text-background mt-10 sm:mt-0">
				<h1 className="md:text-5xl text-3xl font-bold mb-4 w-full">{TITLE}</h1>
				<p className="lg:text-lg text-md font-semibold mt-6 max-w-[70ch]">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
					architecto culpa eos accusamus dicta vel nisi aspernatur quasi, magnam
					recusandae.
				</p>
				<Button className="mt-10" color="primary" variant="faded">
					Seguir leyendo
				</Button>
			</div>
		</section>
	);
}
