import TECH from "@/locales/tecnicas[id].json";
import i18n from "@/locales/root.json";
import { notFound } from "next/navigation";

export async function generateMetadata({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const id = params.id;
	const tech = TECH.DATA[id as keyof typeof TECH.DATA];

	if (!tech) notFound();
	return {
		metadataBase: new URL("https://pomaray.edu.do/"),
		title: `${tech.NAME} - ${i18n.WEBSITE.NAME}`,
		openGraph: {
			images: tech.BANNER,
		},
		description: tech.DESCRIPTION,
	};
}

export async function generateStaticParams() {
	const techs = Object.keys(TECH.DATA) as Array<keyof typeof TECH.DATA>;

	return techs.map((tech) => ({
		slug: tech,
	}));
}

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
