import { Button } from "@nextui-org/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import i18n from "@/locales/root.json";

export function FacebookButton() {
	return (
		<Button
			className="text-lg text-blue-600 bg-white"
			href={i18n.NETWORKS.FACEBOOK}
			target="_blank"
			size="sm"
		>
			<FaFacebook /> Facebook
		</Button>
	);
}

export function InstagramButton() {
	return (
		<Button
			className="text-lg text-danger bg-white"
			href={i18n.NETWORKS.INSTAGRAM}
			target="_blank"
			size="sm"
		>
			<FaInstagram /> Instagram
		</Button>
	);
}

export function SocialIcons() {
	return (
		<div className="hidden lg:flex gap-x-4">
			<Button
				isIconOnly
				className="text-xl text-danger bg-white"
				href={i18n.NETWORKS.INSTAGRAM}
				target="_blank"
				size="sm"
			>
				<FaInstagram />
			</Button>
			<Button
				isIconOnly
				className="text-xl text-blue-600 bg-white"
				href={i18n.NETWORKS.FACEBOOK}
				target="_blank"
				size="sm"
			>
				<FaFacebook />
			</Button>
		</div>
	);
}
