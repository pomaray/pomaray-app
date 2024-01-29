"use client";

// ROUTER Y LOCALES
import { useRouter } from "next/navigation";
import LOCALE from "@/locales/tecnicas.json";

// COMPONENTES
import { Section, SectionTitle } from "@/components/ui/Section";
import { Tech } from "@/types/enums";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { TechIcons } from "@/components/tecnicas/TechIcons";
import { cloneElement } from "react";

export default function HomePage() {
	const router = useRouter();
	const dynamicPath = "/tecnicas";

	return (
		<main className="min-h-[90vh]">
			<Section className="p-10 pt-0">
				<SectionTitle text={LOCALE.HERO.TITULO} />
				<p className="text-lg max-w-2xl mx-auto text-pretty">
					{LOCALE.HERO.DESCRIPCION}
				</p>
			</Section>
			<Section className="pb-20 flex flex-col justify-center 2xl:px-[15rem] tv:px-[45rem]">
				<SectionTitle withLine text={LOCALE.TECH_TITULO} />
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 px-6 sm:px-10 md:px-10 lg:px-[15rem]]">
					{LOCALE.TECNICAS.map((tecnica) => {
						const iconElement = TechIcons.find(
							(icon) => Object.keys(icon)[0] === tecnica.ID,
						)?.[tecnica.ID];

						return (
							<Card
								onClick={() => {
									router.push(`${dynamicPath}/${tecnica.ID.toLowerCase()}`);
								}}
								isPressable
								key={tecnica.ID}
								shadow="none"
								className="xl:p-6 hover:bg-default-200 bg-default-100 shadow-sm text-foreground transition-colors"
							>
								<CardHeader className="flex items-center justify-center pt-5 sm:pt-10">
									<div
										className="p-4 rounded-full border-2 border-primary"
										style={{
											backgroundColor: tecnica.COLOR,
										}}
									>
										{iconElement &&
											cloneElement(iconElement, {
												className: "lg:w-8 lg:h-8 text-white",
											})}
									</div>
								</CardHeader>
								<CardBody className="text-center pb-8">
									<h3 className="md:text-md text-lg font-bold mt-4 mb-2">
										{Tech[tecnica.ID as keyof typeof Tech]}
									</h3>
									<p className="text-sm">{tecnica.DESCRIPCION}</p>
								</CardBody>
							</Card>
						);
					})}
				</div>
			</Section>
		</main>
	);
}
