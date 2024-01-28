"use client";

import { useState } from "react";

import {
	Navbar as NextNavbar,
	NavbarBrand,
	NavbarContent,
	Link,
	NavbarMenu,
	NavbarItem,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";

import { FaInstagram, FaFacebook } from "react-icons/fa";
import { NewsModal } from "@/components/News";
import { NavbarNotify } from "@/components/ui/Notify";

import Logo from "@/components/Logo";
import LOCALE from "@/locales/root.json";

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="relative min-w-screen z-40 h-24">
			<NextNavbar
				onMenuOpenChange={setIsMenuOpen}
				isBlurred={false}
				isBordered
				className="z-50 relative shadow-sm w-screen"
			>
				<NavbarContent>
					<NavbarBrand>
						<Link
							href="/"
							className="cursor-pointer hover:opacity-60 transition-opacity"
						>
							<Logo />
							<p className="font-bold text-inherit text-primary text-lg sm:text-2xl">
								{LOCALE.NAVBAR.NOMBRE}
							</p>
						</Link>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent className="hidden lg:flex gap-4" justify="center">
					{LOCALE.NAVBAR.ITEMS.map((item) => (
						<NavbarItem key={item.LINK}>
							<Link
								className="text-foreground font-semibold cursor-pointer"
								href={item.LINK}
							>
								{item.TEXTO}
							</Link>
						</NavbarItem>
					))}
				</NavbarContent>
				<NavbarContent justify="end">
					<div className="hidden lg:flex gap-x-4">
						<Link
							className="sm:text-2xl text-lg"
							color="primary"
							href={LOCALE.REDES.INSTAGRAM}
							target="_blank"
						>
							<FaInstagram />
						</Link>
						<Link
							className="sm:text-2xl text-lg"
							color="primary"
							href={LOCALE.REDES.FACEBOOK}
							target="_blank"
						>
							<FaFacebook />
						</Link>
					</div>
					<NewsModal />
					<NavbarMenuToggle
						aria-label={
							isMenuOpen
								? "Abrir modal de noticias."
								: "Cerrar modal de noticias."
						}
						className="lg:hidden"
					/>
				</NavbarContent>
				<NavbarMenu className="overflow-hidden">
					{LOCALE.NAVBAR.ITEMS.map((item) => (
						<NavbarMenuItem key={item.LINK}>
							<Link
								className="text-foreground font-semibold cursor-pointer"
								href={item.LINK}
							>
								{item.TEXTO}
							</Link>
						</NavbarMenuItem>
					))}
					<div className="flex flex-row gap-4">
						<Link
							className="text-2xl"
							color="primary"
							href={LOCALE.REDES.INSTAGRAM}
							target="_blank"
						>
							<FaInstagram />
						</Link>
						<Link
							className="text-2xl"
							color="primary"
							href={LOCALE.REDES.FACEBOOK}
							target="_blank"
						>
							<FaFacebook />
						</Link>
					</div>
				</NavbarMenu>
			</NextNavbar>
			<NavbarNotify IsClose={isMenuOpen} />
		</header>
	);
}
