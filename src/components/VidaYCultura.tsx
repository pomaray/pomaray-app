import Link from "next/link";
import i18n from "@/locales/home.json";

import { Card, Image } from "@nextui-org/react";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/ui/ScrollReveal";

export function VidaYCultura() {
	const SUB_TITLE = i18n.LIFE_AND_CULTURE.SUB_TITLE.split("%s");

	return (
		<Reveal>
			<section className="flex flex-col justify-center items-center px-8">
				<Title className="py-4" text={i18n.LIFE_AND_CULTURE.TITLE} />
				<p className="text-foreground">
					{SUB_TITLE[0]}{" "}
					<Link
						className="underline text-primary"
						href={i18n.LIFE_AND_CULTURE.HASHTAG_LINK}
					>
						{i18n.LIFE_AND_CULTURE.HASHTAG}
					</Link>{" "}
					{SUB_TITLE[1]}
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
		</Reveal>
	);
}
