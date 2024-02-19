import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";
import UIProviders from "@/components/ui/Providers";

import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import NProgressProvider from "@/context/NProgress";

// Tipografía.
const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500"] });

import i18n from "@/locales/root.json";

export const metadata: Metadata = {
	title: {
		default: i18n.WEBSITE.NAME,
		template: `%s - ${i18n.WEBSITE.NAME}`,
	},
	openGraph: {
		images: i18n.WEBSITE.BANNER,
		type: "website",
	},
	metadataBase: new URL("https://pomaray.vercel.app/"),
	description: i18n.WEBSITE.DESCRIPTION,
	keywords: i18n.WEBSITE.TAGS,
	category: i18n.WEBSITE.CATEGORY,
	robots: "index, follow",
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang="en">
			<head>
				<meta name="theme-color" content="#397040" />
			</head>
			<body
				className={`bg-transparent overflow-y-auto max-w-[100vw] overflow-x-hidden ${fraunces.className}`}
			>
				<header className="print:hidden relative min-w-screen h-28">
					<div className="fixed z-40">
						<Header />
					</div>
				</header>
				<NProgressProvider>
					<UIProviders>
						{children}
						<Footer />
					</UIProviders>
				</NProgressProvider>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
