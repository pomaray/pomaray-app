"use client";
import { DowloadsTable } from "@/components/descargas/DowloadsTable";
import LOCALE from "@/locales/descargas.json";

export default function DescargasPage() {
	return (
		<section className="container mx-auto py-8">
			<div>
				<h1 className="text-5xl font-bold mb-6 text-primary">
					{LOCALE.HERO.TITULO}
				</h1>
				<p>{LOCALE.HERO.SUB_TITULO}</p>
			</div>
			<div className="min-h-screen">
				<DowloadsTable />
			</div>
		</section>
	);
}
