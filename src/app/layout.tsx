// React Y LOCALES
import React from "react";
import LOCALE from "@/locales/root.json";

// NEXT.JS
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// ESTILOS Y PROVEDORES
import "@/styles/globals.css";
import UIProviders from "@/components/ui/providers";

// COMPONETES DE /components
import { Footer, FooterItem, FooterTable } from "@/components/footer";
import { Header } from "@/components/ui/header";

// TIPOGRAFIA
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
		<html lang="en">
			<body
				className={`light overflow-y-auto overflow-x-hidden ${inter.className}`}
			>
				<header className="relative min-w-screen z-40 h-24">
					<div className="fixed">
						<Header />
					</div>
				</header>
				<UIProviders>{children}</UIProviders>
				<Footer>
					{LOCALE.FOOTER.map((table) => (
						<FooterTable key={table.TITULO.trim()} title={table.TITULO}>
							{table.ELEMENTOS.map((item) => (
								<FooterItem
									key={table.TITULO.trim()}
									text={item.TEXTO}
									href={item.ENLACE}
								/>
							))}
						</FooterTable>
					))}
				</Footer>
			</body>
		</html>
	);
}
