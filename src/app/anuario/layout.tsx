import i18n from "@/locales/anuario.json";

export const metadata = {
	title: i18n.METADATA.TITLE,
	openGraph: {
		images: i18n.METADATA.BANNNER,
	},
	description: i18n.METADATA.DESCRIPTION,
};

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
