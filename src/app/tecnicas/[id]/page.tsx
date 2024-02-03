"use client";

import { notFound, useParams } from "next/navigation";
import i18n from "@/locales/tecnicas[id].json";
import { Image, Card, Button, Chip, Divider } from "@nextui-org/react";

export default function TechniquePage() {
	const { id } = useParams<{ id: string }>();
	const technique = i18n.DATA[id as keyof typeof i18n.DATA];

	const mailTo = () => {
		const subject = i18n.SEND_MAIL.SUBJECT.replace("%s", technique.NAME);
		const body = i18n.SEND_MAIL.MESSAGE.replace("%s", technique.NAME);
		const mailtoLink = `mailto:${
			i18n.SEND_MAIL.MAIL
		}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		window.location.href = mailtoLink;
	};

	if (!technique) notFound();

	return (
		<main className="min-h-screen">
			<article className="max-w-5xl mx-auto overflow-hidden px-6 sm:px-12 py-6">
				<section className="flex flex-col items-center">
					<div>
						<Image src={technique.BANNER} alt={technique.TITLE} />
					</div>
					<div className="flex flex-col justify-center items-start py-8 w-full">
						<Chip
							color="primary"
							variant="bordered"
							size="lg"
							className="mb-2 max-w-full text-ellipsis overflow-hidden"
							classNames={{
								content: "text-ellipsis  overflow-hidden",
							}}
						>
							{technique.NAME}
						</Chip>
						<h1 className="sm:text-4xl text-2xl font-bold mb-2">
							{technique.TITLE}
						</h1>
						{technique.DESCRIPTION.map((desc) => (
							<p
								key={desc.substring(0, 10)}
								className="mb-4 sm:text-lg text-md text-pretty"
							>
								{desc}
							</p>
						))}
						<div className="print:hidden grid grid-cols-2 gap-4 mt-4">
							<Button
								fullWidth
								onClick={() => {
									print();
								}}
								color="primary"
								className="sm:text-md text-sm"
							>
								{i18n.DOWNLOAD_BTN}
							</Button>
							<Button
								fullWidth
								onClick={mailTo}
								color="primary"
								variant="bordered"
								className="sm:text-md text-sm"
							>
								{i18n.REQUEST_BTN}
							</Button>
						</div>
					</div>
				</section>

				{technique.INFORMATION.map((item, index) => {
					if (index === 1) {
						return (
							<section key={item.TITLE} className="print:py-2 py-8">
								<h2 className="sm:text-3xl text-2xl font-bold my-4 text-primary">
									{technique.GALLERY_TITLE}
									<Divider className="h-1 mt-2 bg-primary rounded-full" />
								</h2>
								<div className="grid grid-cols-12 gap-4">
									{technique.IMAGES.map((image, imageIndex) => (
										<Card
											shadow="none"
											key={image.trim()}
											className="lg:col-span-4 sm:col-span-6 col-span-12 h-[300px]"
										>
											<Image
												removeWrapper
												alt={`Image ${imageIndex + 1}`}
												className="z-0 w-full h-full object-cover hover:scale-125 transition-transform"
												src={image}
											/>
										</Card>
									))}
								</div>
							</section>
						);
					}
					return (
						<section
							key={item.TITLE}
							className="print:py-2 sm:py-6 py-2 sm:px-0"
						>
							<h2 className="sm:text-3xl text-2xl font-bold my-4 text-primary">
								{item.TITLE}
								<Divider className="h-1 mt-2 bg-primary rounded-full" />
							</h2>
							{item.PARAGRAPHS.map((parag) => (
								<p
									key={parag.substring(0, 10)}
									className="mb-4 sm:text-lg text-md text-pretty opacity-65"
								>
									{parag}
								</p>
							))}
						</section>
					);
				})}
			</article>
		</main>
	);
}
