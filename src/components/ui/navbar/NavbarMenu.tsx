import i18n from "@/locales/root.json";
import {
	NavbarMenu as NextNavbarMenu,
	NavbarMenuItem,
	Link,
	Divider,
} from "@nextui-org/react";
import {
	FacebookButton,
	InstagramButton,
} from "@/components/ui/navbar/SocialIcons";
import { NavbarContent } from "@/components/ui/navbar/NavbarContent";

export function NavbarMenu() {
	return (
		<NextNavbarMenu className="overflow-hidden bg-background/90 backdrop-blur-lg pt-6">
			<NavbarContent isMenu />
			<div className="flex flex-col gap-2 py-2">
				<div>
					<span className="opacity-80 mb-5">Redes sociales</span>
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
