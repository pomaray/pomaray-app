"use client";
import i18n from "@/locales/root.json";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { FooterTable } from "@/components/ui/footer/FooterTable";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="flex flex-col bg-slate-600 dark:bg-content1 min-h-[10rem] text-white p-6">
			<div className="grid sm:place-content-start sm:grid-cols-2 lg:place-content-center lg:grid-cols-4 xl:px-[20rem]">
				<FooterTable />
			</div>
			<div className="grid grid-cols-1 grid-flow-row place-content-center mt-10 gap-2">
				<p className="relative block col-span-3 text-center text-xs opacity-70 text-white sm:px-20 px-0">
					Copyright © {currentYear} {i18n.WEBSITE.NAME}. Todos los derechos
					reservados.
				</p>
				<ThemeSwitcher />
			</div>
		</footer>
	);
}
