export const metadata = {
	title: "Admin",
};

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}
