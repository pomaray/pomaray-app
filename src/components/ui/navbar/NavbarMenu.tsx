import i18n from "@/locales/root.json";
import {
	NavbarMenu as NextNavbarMenu,
	NavbarMenuItem,
	Link,
} from "@nextui-org/react";
import {
	FacebookButton,
	InstagramButton,
} from "@/components/ui/navbar/SocialIcons";
import { NavbarContent } from "@/components/ui/navbar/NavbarContent";

export function NavbarMenu() {
	return (
		<NextNavbarMenu className="overflow-hidden bg-slate-600/90 dark:bg-default-200/90 pt-6">
			<NavbarContent />
			<div className="flex flex-row gap-4">
				<FacebookButton />
				<InstagramButton />
			</div>
		</NextNavbarMenu>
	);
}
