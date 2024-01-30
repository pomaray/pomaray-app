import { Image } from "@nextui-org/react";
import i18n from "@/locales/nosotros.json";

export default function NosotrosPage() {
	return (
		<article className="max-w-5xl mx-auto px-6 sm:px-12 py-6">
			<section>
				<div className="flex justify-between gap-4 items-center bg-primary text-white w-full px-2">
					<h1 className="sm:text-5xl text-4xl font-bold my-4">
						{i18n.HERO.TITLE}
					</h1>
					<Image
						alt={i18n.HERO.TITLE}
						src={i18n.HERO.LOGO}
						className="max-w-20"
					/>
				</div>
				<p className="text-pretty mt-2">{i18n.HERO.SUBTITLE}</p>
			</section>
			{i18n.CONTENT.map((sec) => {
				return (
					<section key={sec.TITLE}>
						<h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
							{sec.TITLE}
						</h2>
						{sec.PARAGRAPHS.map((parag, index) => {
							const isList = parag.substring(0, 2).trim() === "-";
							const isLastList =
								sec.PARAGRAPHS[index - 1] &&
								sec.PARAGRAPHS[index - 1].substring(0, 2).trim();

							if (isList) {
								return (
									<li className="py-2" key={parag}>
										{parag.replace("-", "")}
									</li>
								);
							}

							return (
								<p
									className={`pb-4 text-pretty ${isLastList && "pt-4"}`}
									key={parag}
								>
									{parag}
								</p>
							);
						})}
					</section>
				);
			})}
		</article>
	);
}
