import { NavbarMenu as NextNavbarMenu, Divider } from "@nextui-org/react";
import {
	FacebookButton,
	InstagramButton,
} from "@/components/ui/navbar/SocialIcons";
import { NavbarContent } from "@/components/ui/navbar/NavbarContent";

export function NavbarMenu() {
	return (
		<NextNavbarMenu className="overflow-hidden bg-background/90 backdrop-blur-lg pt-6">
			<NavbarContent isMenu />
			<div className="flex flex-col gap-4 py-2">
				<div>
					<span className="opacity-80 mb-5 text-lg">Redes sociales</span>
					<Divider />
				</div>
				<div className="flex flex-row gap-4">
					<FacebookButton />
					<InstagramButton />
				</div>
			</div>
		</NextNavbarMenu>
	);
}
