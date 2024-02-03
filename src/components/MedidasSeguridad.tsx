import i18n from "@/locales/home.json";
import Link from "next/link";

import { type CollageContent, Collage } from "@/components/ui/Collage";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/ui/ScrollReveal";

export function MedidasDeSeguridad() {
	const MEDIDAS_DE_SEGURIDAD_SUBTITULO =
		i18n.SECURITY_MEASURES.SUB_TITLE.split("%s");
	const contentSections: CollageContent[] = i18n.SECURITY_MEASURES.COLLAGE;

	return (
		<Reveal>
			<section className="text-center text-foreground">
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
		</Reveal>
	);
}
