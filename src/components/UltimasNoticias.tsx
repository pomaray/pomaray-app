import i18n from "@/locales/home.json";

import { Title } from "@/components/ui/Title";
import { NewsCard } from "@/components/noticias/NewsCard";
import { Button } from "@nextui-org/button";
import { Reveal } from "./ui/ScrollReveal";

export function UltimasNoticias() {
	return (
		<Reveal>
			<section className="flex flex-col justify-center items-center gap-10">
				<Title withLine text={i18n.NEWS.TITLE} />
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
					<Button aria-label={i18n.NEWS.READ_BTN} color="primary">
						{i18n.NEWS.READ_BTN}
					</Button>
				</a>
			</section>
		</Reveal>
	);
}
