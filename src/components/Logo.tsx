import Image from "next/image";
import { twMerge } from "tailwind-merge";
import i18n from "@/locales/root.json";

type LogoProps = {
	className?: string;
	width?: number;
};

export default function Logo({ className, width = 40 }: LogoProps) {
	return (
		<Image
			src={i18n.NAVBAR.LOGO}
			alt="Logo"
			className={twMerge("mx-2 w-auto h-auto", className)}
			width={width}
			height={width}
		/>
	);
}
