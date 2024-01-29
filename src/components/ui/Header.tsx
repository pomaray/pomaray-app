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
	Button,
} from "@nextui-org/react";

import { FaInstagram, FaFacebook } from "react-icons/fa";
import { NewsModal } from "@/components/News";
import { NavbarNotify } from "@/components/ui/Notify";

import Logo from "@/components/Logo";
import LOCALE from "@/locales/root.json";

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<header className="relative min-w-screen z-40 h-28">
			<NextNavbar
				isBlurred={false}
				isBordered={false}
				onMenuOpenChange={setIsMenuOpen}
				className="z-50 relative shadow-sm border-none outline-none w-screen bg-slate-600 dark:bg-default-200"
			>
				<NavbarContent>
					<NavbarBrand>
						<Link
							href="/"
							className="cursor-pointer hover:opacity-60 transition-opacity"
						>
							<Logo />
							<p className="font-bold text-inherit text-white text-lg sm:text-2xl">
								{LOCALE.NAVBAR.NOMBRE}
							</p>
						</Link>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent className="hidden lg:flex gap-4" justify="center">
					{LOCALE.NAVBAR.ITEMS.map((item) => (
						<NavbarItem key={item.LINK}>
							<Link
								className="text-white font-semibold cursor-pointer"
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
							className="sm:text-xl text-lg text-danger bg-white rounded-lg p-1"
							href={LOCALE.REDES.INSTAGRAM}
							target="_blank"
						>
							<FaInstagram />
						</Link>
						<Link
							className="sm:text-xl text-md text-blue-600 bg-white rounded-lg p-1"
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
						className="lg:hidden text-white"
					/>
				</NavbarContent>
				<NavbarMenu className="overflow-hidden bg-slate-600/90 dark:bg-default-200/90 pt-6">
					{LOCALE.NAVBAR.ITEMS.map((item) => (
						<NavbarMenuItem key={item.LINK}>
							<Link
								className="text-white font-semibold cursor-pointer"
								href={item.LINK}
							>
								{item.TEXTO}
							</Link>
						</NavbarMenuItem>
					))}
					<div className="flex flex-row gap-4">
						<Button
							isIconOnly
							className="text-2xl text-danger bg-white"
							href={LOCALE.REDES.INSTAGRAM}
							target="_blank"
						>
							<FaInstagram />
						</Button>
						<Button
							isIconOnly
							className="text-2xl text-blue-600 bg-white"
							href={LOCALE.REDES.FACEBOOK}
							target="_blank"
						>
							<FaFacebook />
						</Button>
					</div>
				</NavbarMenu>
			</NextNavbar>
			<NavbarNotify IsClose={isMenuOpen} />
		</header>
	);
}
