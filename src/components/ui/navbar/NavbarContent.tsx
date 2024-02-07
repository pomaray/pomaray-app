"use client";
import i18n from "@/locales/root.json";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/react";
import { ChevronIcon } from "@nextui-org/shared-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidInstitution } from "react-icons/bi";
import { FaPhone, FaDownload } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

const ICONS = {
	"/contacto": (
		<FaPhone className="text-primary" fill="currentColor" size={30} />
	),
	"/descargas": (
		<FaDownload className="text-primary" fill="currentColor" size={30} />
	),
	"/nosotros": (
		<BiSolidInstitution
			className="text-primary"
			fill="currentColor"
			size={30}
		/>
	),
};

interface NavbarContentProps {
	isMenu?: boolean;
}

export function NavbarContent({ isMenu = false }: NavbarContentProps) {
	const path = usePathname();
	const [isActive, setIsActive] = useState("/");

	useEffect(() => {
		setIsActive(path);
	}, [path]);

	return i18n.NAVBAR.ITEMS.map((item) => {
		if (!isMenu) {
			if (!item.SUB_ITEMS) {
				const itemIsActive = item.LINK === isActive;

				return (
					<NavbarItem key={item.LINK} isActive={itemIsActive}>
						<Link
							className="text-foreground font-semibold cursor-pointer"
							href={item.LINK}
						>
							{item.TEXT}
						</Link>
					</NavbarItem>
				);
			}
			if (item.SUB_ITEMS) {
				const itemIsActive = item.SUB_ITEMS?.some(
					(subItem) => subItem.LINK === isActive,
				);

				return (
					<NavbarItem key={item.TEXT} isActive={itemIsActive}>
						<Dropdown radius="sm">
							<DropdownTrigger>
								<Button
									disableRipple
									className="p-0 bg-transparent data-[hover=true]:bg-transparent font-semibold text-md"
									endContent={<ChevronIcon className="-rotate-90" />}
									radius="sm"
									variant="light"
								>
									{item.TEXT}
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								aria-label={item.TEXT}
								className="w-[340px]"
								itemClasses={{
									base: "gap-4",
								}}
							>
								{item.SUB_ITEMS.map((subItem) => (
									<DropdownItem
										as={Link}
										href={subItem.LINK}
										key={subItem.LINK}
										description={subItem.DESCRIPTION}
										startContent={ICONS[subItem.LINK as keyof typeof ICONS]}
										className={
											subItem.LINK === isActive ? "opacity-100" : "opacity-65"
										}
									>
										{subItem.TEXT}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
					</NavbarItem>
				);
			}
		} else if (item.LINK && isMenu) {
			const itemIsActive = item.LINK === isActive;

			return (
				<NavbarMenuItem isActive={itemIsActive} key={item.LINK}>
					<Link
						className={twMerge(
							"text-foreground font-semibold cursor-pointer text-xl",
							itemIsActive && "opacity-30",
						)}
						href={item.LINK}
					>
						{item.TEXT}
					</Link>
				</NavbarMenuItem>
			);
		} else if (item.SUB_ITEMS && isMenu) {
			const itemIsActive = item.SUB_ITEMS?.some(
				(subItem) => subItem.LINK === isActive,
			);

			return item.SUB_ITEMS.map((subitem) => (
				<NavbarMenuItem isActive={itemIsActive} key={subitem.LINK}>
					<Link
						className="text-foreground font-semibold cursor-pointer text-xl"
						href={subitem.LINK}
					>
						{subitem.TEXT}
					</Link>
				</NavbarMenuItem>
			));
		}
		return null; // Added to handle cases where neither condition is met
	});
}
