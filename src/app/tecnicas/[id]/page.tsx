"use client";

import { useParams } from "next/navigation";
import LOCALE from "@/locales/tecnicas[id].json";
import { Image, Card, Button, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function TechniquePage() {
	const { id } = useParams<{ id: string }>();

	const technique = LOCALE.DATA[id as keyof typeof LOCALE.DATA];
	const router = useRouter();

	const mailTo = () => {
		const subject = LOCALE.ENVIO_CORREO.SUJETO.replace("%s", technique.NOMBRE);
		const body = LOCALE.ENVIO_CORREO.MENSAJE.replace("%s", technique.NOMBRE);
		const mailtoLink = `mailto:${
			LOCALE.ENVIO_CORREO.CORREO
		}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		window.location.href = mailtoLink;
	};

	if (!technique) {
		router.push("/not-found");
		return;
	}

	return (
		<main className="min-h-screen">
			<article className="max-w-6xl mx-auto overflow-hidden p-12">
				<section className="flex flex-col items-center">
					<div>
						<Image
							shadow="none"
							src={technique.BANNER}
							alt={technique.TITULO}
						/>
					</div>
					<div className="flex flex-col justify-center items-start py-8 w-full">
						<Chip size="sm" className="mb-2 max-w-full">
							{technique.NOMBRE}
						</Chip>
						<h1 className="text-4xl font-bold mb-2">{technique.TITULO}</h1>
						{technique.DESCRIPCION.map((desc) => (
							<p key={desc.substring(0, 10)} className="text-gray-700 mb-4">
								{desc}
							</p>
						))}
						<div className="flex space-x-4 mt-4">
							<Button color="primary">{LOCALE.DESCARGAR_BTN}</Button>
							<Button onClick={mailTo} color="primary" variant="bordered">
								{LOCALE.SOLICITAR_BTN}
							</Button>
						</div>
					</div>
				</section>

				{technique.INFORMACION.map((item) => (
					<section key={item.TITULO} className="py-6 px-4 sm:px-0">
						<h2 className="text-3xl font-bold my-4">{item.TITULO}</h2>
						{item.PARRAFOS.map((parrafo) => (
							<p
								key={parrafo.substring(0, 10)}
								className="opacity-80 text-lg text-pretty mb-4"
							>
								{parrafo}
							</p>
						))}
					</section>
				))}

				<section className="py-8">
					<h2 className="text-3xl font-bold mb-4">
						{technique.GALERIA_TITULO}
					</h2>
					<div className="grid grid-cols-12 gap-4">
						{technique.IMAGENES.map((image, index) => (
							<Card
								shadow="none"
								key={image.trim()}
								className="col-span-12 sm:col-span-4 h-[300px]"
							>
								<Image
									removeWrapper
									alt={`Image ${index + 1}`}
									className="z-0 w-full h-full object-cover"
									src={image}
								/>
							</Card>
						))}
					</div>
				</section>
			</article>
		</main>
	);
}
