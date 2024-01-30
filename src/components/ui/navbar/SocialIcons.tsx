import { Button } from "@nextui-org/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import i18n from "@/locales/root.json";

export function FacebookButton() {
	return (
		<Button
			isIconOnly
			className="text-xl text-blue-600 bg-white"
			href={i18n.NETWORKS.FACEBOOK}
			target="_blank"
			size="sm"
		>
			<FaFacebook />
		</Button>
	);
}

export function InstagramButton() {
	return (
		<Button
			isIconOnly
			className="text-xl text-danger bg-white"
			href={i18n.NETWORKS.INSTAGRAM}
			target="_blank"
			size="sm"
		>
			<FaInstagram />
		</Button>
	);
}

export function SocialIcons() {
	return (
		<div className="hidden lg:flex gap-x-4">
			<FacebookButton />
			<InstagramButton />
		</div>
	);
}
