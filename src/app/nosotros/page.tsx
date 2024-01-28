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
		<article className="max-w-5xl mx-auto overflow-hidden px-6 sm:px-12 py-6">
			<Image
				src={banner.IMAGEN}
				alt={banner.titulo}
				className="rounded-lg" />
			<Section className="flex flex-col items-center">

				<section className="text-foreground sm:py-6 py-2 sm:px-0">
					<h1 className="sm:text-3xl text-xl font-bold my-4 text-primary">{titulo}</h1>
					<p className="opacity-80 sm:text-lg text-sm text-pretty sm:mb-4 mb-2">{desarrollo.subtitulo}</p>
					{desarrollo.parrafos.map((parrafo: string, index: number) => (
						<p key={index} className="opacity-80 sm:text-lg text-sm text-pretty sm:mb-4 mb-2">
							{parrafo}
						</p>
					))}
				</section>
			</Section>

			<Section className="mb-8">
				<h2 className="sm:text-3xl text-xl font-bold my-4 text-primary">{aportesSignificativos.subtitulo}</h2>

				<div className="text-foreground grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
					<ul className="list-disc ml-6 flex flex-wrap">
						{aportesSignificativos.contenido.map((aporte: string, index: number) => (
							<li key={index} className="mb-2 flex-shrink-0">
								{aporte}
							</li>
						))}
					</ul>
				</div>
			</Section>


			<Section>
				<h1 className="text-3xl font-bold mb-4 text-primary">{carrerasPrecursoras.subtitulo}</h1> 

				<article className="text-foreground">
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
