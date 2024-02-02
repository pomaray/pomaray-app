"use client";

import { useState } from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent as NextNavbarContent,
	Link,
	NavbarMenuToggle,
} from "@nextui-org/react";
import { SocialIcons } from "@/components/ui/navbar/SocialIcons";
import { NewsModal } from "@/components/noticias/NewsModal";
import { NavbarNotify } from "@/components/ui/Notify";
import { NavbarMenu } from "@/components/ui/navbar/NavbarMenu";
import { NavbarContent } from "@/components/ui/navbar/NavbarContent";
import Logo from "@/components/Logo";
import i18n from "@/locales/root.json";

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<header className="relative min-w-screen z-40 h-28">
			<Navbar
				isBlurred={false}
				isBordered={false}
				onMenuOpenChange={setIsMenuOpen}
				className="z-50 relative shadow-sm border-none outline-none w-screen bg-background print:hidden"
			>
				<NextNavbarContent>
					<NavbarBrand>
						<Link
							href="/"
							className="cursor-pointer hover:opacity-60 transition-opacity"
						>
							<Logo className="relative fill-primary top-0.5" />
							<p className="font-bold text-inherit text-foreground text-lg sm:text-3xl">
								{i18n.NAVBAR.NAME}
							</p>
						</Link>
					</NavbarBrand>
				</NextNavbarContent>
				<NextNavbarContent className="hidden lg:flex gap-4" justify="center">
					<NavbarContent />
				</NextNavbarContent>
				<NextNavbarContent justify="end">
					<SocialIcons />
					<NewsModal />
					<NavbarMenuToggle className="lg:hidden text-foreground" />
				</NextNavbarContent>
				<NavbarMenu />
			</Navbar>
			<NavbarNotify isClose={isMenuOpen} />
		</header>
	);
}
