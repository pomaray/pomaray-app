"use client";
import { DownloadsTable } from "@/components/descargas/DownloadsTable";
import { Title } from "@/components/ui/Title";
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
			className="max-w-7xl mx-auto sm:px-10 px-6"
		>
			<section>
				<Title
					text={
						<h1 className="sm:text-6xl text-4xl mb-4">{i18n.HERO.TITLE}</h1>
					}
					withLine
				/>
				<p className="max-w-[70ch] text-pretty">{i18n.HERO.SUB_TITLE}</p>
			</section>
			<DownloadsTable />
		</motion.main>
	);
}
