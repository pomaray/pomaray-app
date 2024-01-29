"use client";
import Link from "next/link";
import LOCALE from "@/locales/root.json";
import ThemeSwitcher from "./ThemeSwitcher";

type FooterTableProps = {
	title?: string;
};

export function FooterItem({
	text,
	href,
}: {
	text: string;
	href: string;
}) {
	return (
		<li className="hover:underline hover:opacity-100 opacity-60 transition-opacity">
			<Link href={href}>{text}</Link>
		</li>
	);
}

export function FooterTable({
	children,
	title,
}: {
	children: React.ReactNode;
} & FooterTableProps) {
	return (
		<ul className="relative flex flex-col gap-1 w-fit h-fit p-4">
			{title && <h3 className="font-bold text-base py-2">{title}</h3>}
			{children}
		</ul>
	);
}

export function Footer({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="flex flex-col bg-slate-600 dark:bg-content1 min-h-[10rem] text-white p-6">
			<div
				className="grid
        			sm:place-content-start sm:grid-cols-2
        			lg:place-content-center lg:grid-cols-4
					lg:px-[20rem]"
			>
				{children}
			</div>
			<div className="grid grid-cols-1 grid-flow-row place-content-center mt-10 gap-2">
				<p className="relative block col-span-3 text-center text-xs opacity-70 text-white sm:px-20 px-0">
					Copyright © {currentYear} {LOCALE.SITIO_WEB.NOMBRE}. Todos los
					derechos reservados.
				</p>
				<ThemeSwitcher />
			</div>
		</footer>
	);
}
