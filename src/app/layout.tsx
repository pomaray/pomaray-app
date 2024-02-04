import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/styles/globals.css";
import UIProviders from "@/components/ui/Providers";

import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import NProgressProvider from "@/context/NProgress";

// Tipografía.
const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500"] });

import i18n from "@/locales/home.json";

export const metadata = {
	title: i18n.METADATA.TITLE,
	openGraph: {
		images: i18n.METADATA.BANNNER,
	},
	description: i18n.METADATA.DESCRIPTION,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang="en">
			<body
				className={`bg-transparent overflow-y-auto max-w-[100vw] overflow-x-hidden ${fraunces.className}`}
			>
				<header className="print:hidden relative min-w-screen z-40 h-32">
					<div className="fixed">
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
			</body>
		</html>
	);
}
