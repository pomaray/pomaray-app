import type { Metadata, ResolvingMetadata } from "next";
import TECH from "@/locales/tecnicas[id].json";
import LOCALE from "@/locales/root.json";

type Props = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// read route params
	const id = params.id;

	const previousImages = (await parent).openGraph?.images || [];
	const technique = TECH.DATA[id as keyof typeof TECH.DATA];

	return {
		title: `${technique.NOMBRE} - ${LOCALE.SITIO_WEB.NOMBRE}`,
		openGraph: {
			images: [technique.BANNER, ...previousImages],
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
