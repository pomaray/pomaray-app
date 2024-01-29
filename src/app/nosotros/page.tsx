import { Section, SectionTitle } from "@/components/ui/Section";
import { Image, Card, Chip, CardBody } from "@nextui-org/react";
import aboutData from "@/locales/nosotros.json";

export default function NosotrosPage() {
	const nosotrosData = aboutData.nuestraHistoria || {};

	const { banner, titulo, desarrollo, aportesSignificativos, carrerasPrecursoras } = nosotrosData;

	if (!banner || !titulo || !desarrollo || !aportesSignificativos || !carrerasPrecursoras) {
		return (
			<main className="min-h-screen">
				<p>Error al cargar los datos de Nosotros.</p>
			</main>
		);
	}

	return (
		<article className="max-w-5xl mx-auto overflow-hidden px-6 sm:px-12 py-6 container">
			<Image src={banner.IMAGEN} alt={banner.titulo} className="rounded-lg" />
			<div className="flex flex-col items-center">

				<section className="sm:py-6 py-2 sm:px-0 ">
					<h1 className="sm:text-3xl text-xl font-bold my-4 text-primary text-center">{titulo}</h1>
					<p className="opacity-80 sm:text-lg text-sm text-pretty sm:mb-4 mb-2 text-primary">{desarrollo.subtitulo}</p>
					{desarrollo.parrafos.map((parrafo: string, index: number) => (
						<p key={index} className="opacity-80 sm:text-lg text-sm text-pretty sm:mb-4 mb-2">
							{parrafo}
						</p>
					))}
				</section>
			</div>

			<Section>
				<h2 className="sm:text-3xl text-xl font-bold my-4 text-primary">{aportesSignificativos.subtitulo}</h2>

				<article className="text-foreground max-w-[88ch]">
					<ul className="list-disc ml-6">
						{aportesSignificativos.contenido.map((aporte: string, index: number) => (
							<li key={index} className="mb-2 flex-shrink-0">
								{aporte}
							</li>
						))}
					</ul>
				</article>
			</Section>

			<Section>
				<h1 className="text-3xl font-bold mb-4 text-primary">{carrerasPrecursoras.subtitulo}</h1>

				<article className="text-foreground max-w-[88ch]">
					<ul className="list-disc ml-6">
						{carrerasPrecursoras.contenido.map((carrera: string, index: number) => (
							<li key={index} className="mb-2">
								{carrera}
							</li>
						))}
					</ul>
				</article>
			</Section>
		</article>
	);
}
