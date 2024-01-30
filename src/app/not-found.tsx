"use client";
import { TbError404Off } from "react-icons/tb";
import { Button, Link } from "@nextui-org/react";
import i18n from "@/locales/not-found.json";

export default function NotFound() {
	return (
		<section className="min-h-[70vh] max-w-5xl mx-auto flex flex-col items-center justify-center mb-32">
			<TbError404Off className="text-[200px] text-primary mb-10" />
			<div className="flex flex-col text-center justify-center gap-y-6 px-12">
				<h1 className="text-4xl text-primary font-bold">{i18n.TITLE}</h1>
				<p className="text-lg max-w-[50ch] mx-auto">{i18n.SUB_TITLE}</p>
				<a href="/">
					<Button color="primary">Volver a inicio</Button>
				</a>
			</div>
		</section>
	);
}
