"use client";
import { DowloadsTable } from "@/components/descargas/DowloadsTable";
import i18n from "@/locales/descargas.json";
import { motion } from "framer-motion";

export default function DescargasPage() {
	return (
		<motion.main
			initial={{
				translateY: 100,
				opacity: 0,
			}}
			animate={{
				translateY: 0,
				opacity: 1,
			}}
			className="container mx-auto p-8"
		>
			<section>
				<h1 className="text-5xl font-bold mb-6 text-primary">
					{i18n.HERO.TITLE}
				</h1>
				<p>{i18n.HERO.SUB_TITLE}</p>
			</section>
			<section className="min-h-screen">
				<DowloadsTable />
			</section>
		</motion.main>
	);
}
