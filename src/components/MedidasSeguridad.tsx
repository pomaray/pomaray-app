import i18n from "@/locales/home.json";
import Link from "next/link";

import { type CollageContent, Collage } from "@/components/ui/Collage";
import { Title } from "@/components/ui/Title";
import { Reveal } from "@/components/ui/ScrollReveal";
import { Link as UILink } from "@nextui-org/link";
export function MedidasDeSeguridad() {
	const MEDIDAS_DE_SEGURIDAD_SUBTITULO =
		i18n.SECURITY_MEASURES.SUB_TITLE.split("%s");
	const contentSections: CollageContent[] = i18n.SECURITY_MEASURES.COLLAGE;

	return (
		<Reveal>
			<section className="text-foreground text-center">
				<div>
					<Title
						className="max-w-[50ch] mx-auto"
						text={i18n.SECURITY_MEASURES.TITLE}
					/>
					<p className="sm:text-lg text-sm mt-4 mx-auto max-w-[55ch] my-12 text-pretty">
						{MEDIDAS_DE_SEGURIDAD_SUBTITULO[0]}
						<UILink
							as={Link}
							showAnchorIcon
							aria-label="Ver medidas de seguridad en nosotros"
							className="sm:text-lg text-sm"
							href="/nosotros#seguridad"
						>
							{i18n.SECURITY_MEASURES.SUB_TITLE_LINK}
						</UILink>
						{MEDIDAS_DE_SEGURIDAD_SUBTITULO[1]}
					</p>
				</div>
				<Collage contentSections={contentSections} />
			</section>
		</Reveal>
	);
}
