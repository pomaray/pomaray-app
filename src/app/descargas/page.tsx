"use client";
import { DowloadsTable } from "@/components/descargas/DowloadsTable";
import i18n from "@/locales/descargas.json";

export default function DescargasPage() {
	return (
		<section className="container mx-auto py-8">
			<div>
				<h1 className="text-5xl font-bold mb-6 text-primary">
					{i18n.HERO.TITLE}
				</h1>
				<p>{i18n.HERO.SUB_TITLE}</p>
			</div>
			<div className="min-h-screen">
				<DowloadsTable />
			</div>
		</section>
	);
}
