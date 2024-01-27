import Link from "next/link";
import LOCALE from "@/locales/root.json";

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
			{title && <h4 className="font-bold text-base py-2">{title}</h4>}
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
		<footer className="flex flex-col bg-gray-500 min-h-[10rem] w-screen py-10 shadow-small text-foreground-50">
			<div className="relative px-12 lg:px-[10rem] 2xl:px-[30rem]">
				<div
					className="grid
        			sm:place-content-start sm:grid-cols-2
        			lg:place-content-center lg:grid-cols-4"
				>
					{children}
				</div>
				<div className="grid grid-cols-1 grid-flow-row place-content-center mt-10 gap-2">
					<p className="relative block col-span-3 text-center text-xs opacity-70 text-base-color sm:px-20 px-0">
						Copyright © {currentYear} {LOCALE.SITIO_WEB.NOMBRE}. Todos los
						derechos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
}
