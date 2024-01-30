"use client";
import { TechIcons } from "@/components/tecnicas/TechIcons";
import { TechCard } from "@/components/tecnicas/TechCard";
import { Title } from "@/components/ui/Title";
import { useRouter } from "next/navigation";
import i18n from "@/locales/tecnicas.json";

export default function HomePage() {
	const router = useRouter();
	const dynamicPath = "/tecnicas";

	return (
		<main className="min-h-[90vh]">
			<section className="p-10 pt-0">
				<Title text={i18n.HERO.TITLE} />
				<p className="text-lg max-w-2xl mx-auto text-pretty sm:text-center">
					{i18n.HERO.DESCRIPTION}
				</p>
			</section>
			<section className="pb-20 flex flex-col justify-center 2xl:px-[15rem] tv:px-[45rem]">
				<Title withLine text={i18n.TECH_TITLE} />
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 px-6 sm:px-10 md:px-10 lg:px-[15rem]]">
					{i18n.TECHS.map((tech) => {
						const iconElement = TechIcons.find(
							(icon) => Object.keys(icon)[0] === tech.ID,
						)?.[tech.ID];

						return (
							<TechCard
								key={tech.ID}
								dynamicPath={dynamicPath}
								TechId={tech.ID}
								color={tech.COLOR}
								iconElement={iconElement}
								description={tech.DESCRIPTION}
							/>
						);
					})}
				</div>
			</section>
		</main>
	);
}
