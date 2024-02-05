"use client";
import i18n from "@/locales/root.json";
import Logo from "@/components/ui/Logo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
	Navbar,
	NavbarBrand,
	NavbarContent as NextNavbarContent,
	Link,
	NavbarMenuToggle,
	Button,
	NavbarItem,
} from "@nextui-org/react";
import { SocialIcons } from "@/components/ui/navbar/SocialIcons";
import { NavbarNotify } from "@/components/ui/Notify";
import { NavbarMenu } from "@/components/ui/navbar/NavbarMenu";
import { NavbarContent } from "@/components/ui/navbar/NavbarContent";

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const path = usePathname();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isMenuOpen) {
			setIsMenuOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [path]);

	return (
		<header className="relative min-w-screen z-40 h-18">
			<Navbar
				classNames={{
					item: [
						"flex",
						"relative",
						"h-full",
						"items-center",
						"data-[active=true]:after:content-['']",
						"data-[active=true]:after:absolute",
						"data-[active=true]:after:bottom-0",
						"data-[active=true]:after:left-0",
						"data-[active=true]:after:right-0",
						"data-[active=true]:after:h-[2px]",
						"data-[active=true]:after:rounded-[2px]",
						"data-[active=true]:after:bg-primary",
					],
				}}
				isBlurred={false}
				isBordered={false}
				isMenuOpen={isMenuOpen}
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
					<NavbarItem>
						<Button
							as={Link}
							color="primary"
							href="/noticias"
							size="md"
							variant="bordered"
							className="text-foreground"
						>
							{i18n.NAVBAR.SEE_NEWS}
						</Button>
					</NavbarItem>
					<NavbarMenuToggle className="lg:hidden text-foreground" />
				</NextNavbarContent>
				<NavbarMenu />
			</Navbar>
			<NavbarNotify isClose={isMenuOpen} />
		</header>
	);
}
