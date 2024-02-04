import { Header } from "@/components/admin/AdminHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Admin",
	openGraph: {
		images: "/banner/admin.png",
	},
	metadataBase: new URL("https://pomaray.vercel.app/"),
	description: "Dashboard de administrador.",
	robots: "noindex",
};
export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="container mx-auto">
			<Header />
			{children}
		</main>
	);
}
