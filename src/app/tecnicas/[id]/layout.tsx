import type { Metadata, ResolvingMetadata } from "next";
import TECH from "@/locales/tecnicas[id].json";
import LOCALE from "@/locales/root.json";

type Props = {
	params: { id: string };
};

export async function generateMetadata({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const id = params.id;
	const technique = TECH.DATA[id as keyof typeof TECH.DATA];
	return {
		metadataBase: new URL("https://pomaray.vercel.app/"),
		title: `${technique.NOMBRE} - ${LOCALE.SITIO_WEB.NOMBRE}`,
		openGraph: {
			images: technique.BANNER,
		},
	};
}

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
