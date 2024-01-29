import Image from "next/image";
import { twMerge } from "tailwind-merge";

type LogoProps = {
	className?: string;
};

export default function Logo({ className }: LogoProps) {
	const logoPath = "/images/logo.png";

	return (
		<Image
			src={logoPath}
			alt="Logo"
			className={twMerge("mx-2", className)}
			width={40}
			height={40}
		/>
	);
}
