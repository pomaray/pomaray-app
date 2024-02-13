"use client";
import i18n from "@/locales/nosotros.json";

import { Divider } from "@nextui-org/divider";
import { HistoryTimeline } from "@/components/ui/Timeline";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";

export default function NosotrosPage() {
	return (
		<motion.article
			initial={{
				translateY: 100,
				opacity: 0,
			}}
			animate={{
				translateY: 0,
				opacity: 1,
			}}
			className="max-w-5xl mx-auto px-6 sm:px-12 py-6"
		>
			<section>
				<div className="flex justify-between gap-4 items-center bg-primary text-white w-full px-2">
					<h1 className="sm:text-5xl text-4xl font-bold my-4">
						{i18n.HERO.TITLE}
					</h1>
					<Logo className="fill-white mt-2" width={80} />
				</div>
				<p className="text-pretty mt-6">{i18n.HERO.SUBTITLE}</p>
				<div className="mx-auto py-16">
					<HistoryTimeline points={i18n.TIME_LINE} />
				</div>
			</section>

			{i18n.CONTENT.map((sec) => (
				<section key={sec.TITLE}>
					<h2 className="sm:text-3xl text-2xl text-balance text-primary font-bold mt-4 mb-2">
						{sec.TITLE}
					</h2>
					<Divider className="bg-primary h-1 rounded-full mb-6	" />

					{sec.PARAGRAPHS.map((parag, paragIndex) => {
						const isList = parag.substring(0, 2).trim() === "-";
						const isLastList =
							sec.PARAGRAPHS[paragIndex - 1] &&
							sec.PARAGRAPHS[paragIndex - 1].substring(0, 2).trim();

						if (isList) {
							return (
								<li className="py-2" key={parag}>
									{parag.replace("-", "")}
								</li>
							);
						}

						return (
							<p className={`text-pretty ${isLastList && "pt-4"}`} key={parag}>
								{parag}
							</p>
						);
					})}
				</section>
			))}
		</motion.article>
	);
}
