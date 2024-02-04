import { Header } from "@/components/admin/AdminHeader";

export const metadata = {
	title: "Admin",
	openGraph: {
		images: "/banner/admin.png",
	},
	description: "Dashboard de administrador.",
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
