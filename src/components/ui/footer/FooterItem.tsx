import Link from "next/link";

export function FooterItem({
	text,
	href,
}: {
	text: string;
	href: string;
}) {
	return (
		<li className="hover:underline hover:opacity-100 opacity-60 transition-opacity">
			<Link href={href}>{text}</Link>
		</li>
	);
}
