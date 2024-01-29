import { Image } from "@nextui-org/react";
import LOCALE from "@/locales/nosotros.json";

export default function NosotrosPage() {
	return (
		<article className="max-w-5xl mx-auto px-6 sm:px-12 py-6">
			<section>
				<div className="flex gap-4 items-center">
					<h1 className="sm:text-5xl text-4xl font-bold my-4 text-primary">
						{LOCALE.HERO.TITULO}
					</h1>
					<Image
						alt={LOCALE.HERO.TITULO}
						src={LOCALE.HERO.LOGO}
						className="max-w-20"
					/>
				</div>
				<p className="text-pretty mt-2">{LOCALE.HERO.SUBTITLO}</p>
			</section>
			{LOCALE.CONTENIDO.map((seccion) => {
				return (
					<section key={seccion.TITLE}>
						<h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
							{seccion.TITLE}
						</h2>
						{seccion.PARRAFOS.map((paf, index) => {
							const isList = paf.substring(0, 2).trim() === "-";
							const isLastList =
								seccion.PARRAFOS[index - 1] &&
								seccion.PARRAFOS[index - 1].substring(0, 2).trim();

							if (isList) {
								return (
									<li className="py-2" key={paf}>
										{paf.replace("-", "")}
									</li>
								);
							}

							return (
								<p
									className={`pb-4 text-pretty ${isLastList && "pt-4"}`}
									key={paf}
								>
									{paf}
								</p>
							);
						})}
					</section>
				);
			})}
		</article>
	);
}
