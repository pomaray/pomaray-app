import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/styles/globals.css";
import UIProviders from "@/components/ui/Providers";

import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";

import i18n from "@/locales/root.json";

// Tipografía.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: i18n.WEBSITE.NAME,
		template: `%s - ${i18n.WEBSITE.NAME}`,
	},
	description: i18n.WEBSITE.DESCRIPTION,
	keywords: i18n.WEBSITE.TAGS,
	category: i18n.WEBSITE.CATEGORY,
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
					<Footer />
				</UIProviders>
				<SpeedInsights />
			</body>
		</html>
	);
}
