import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/styles/globals.css";
import UIProviders from "@/components/ui/Providers";

import { Footer, FooterItem, FooterTable } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";

import LOCALE from "@/locales/root.json";

// Tipografía.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: LOCALE.SITIO_WEB.NOMBRE,
		template: `%s - ${LOCALE.SITIO_WEB.NOMBRE}`,
	},
	description: LOCALE.SITIO_WEB.DESCRIPCION,
	keywords: LOCALE.SITIO_WEB.TAGS,
	category: LOCALE.SITIO_WEB.CATEGORIA,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang="en">
			<body
				className={`bg-transparent overflow-y-auto max-w-[100vw] overflow-x-hidden ${inter.className}`}
			>
				<header className="relative min-w-screen z-40 h-32">
					<div className="fixed">
						<Header />
					</div>
				</header>
				<UIProviders>
					{children}
					<Footer>
						{LOCALE.FOOTER.map((table) => (
							<FooterTable key={table.TITULO.trim()} title={table.TITULO}>
								{table.ELEMENTOS.map((item) => (
									<FooterItem
										key={item.TEXTO.trim()}
										text={item.TEXTO}
										href={item.ENLACE}
									/>
								))}
							</FooterTable>
						))}
					</Footer>
				</UIProviders>
				<SpeedInsights />
			</body>
		</html>
	);
}
