import { Header } from "@/components/admin/AdminHeader";

export const metadata = {
	title: "Admin",
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
