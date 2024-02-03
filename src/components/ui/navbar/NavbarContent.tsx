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
import { BiSolidInstitution } from "react-icons/bi";
import { FaPhone, FaDownload } from "react-icons/fa6";

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
	return i18n.NAVBAR.ITEMS.map((item) => {
		if (!isMenu) {
			if (!item.SUB_ITEMS) {
				return (
					<NavbarItem key={item.LINK}>
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
				return (
					<NavbarItem key={item.TEXT}>
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
			return (
				<NavbarMenuItem key={item.LINK}>
					<Link
						className="text-foreground font-semibold cursor-pointer text-xl"
						href={item.LINK}
					>
						{item.TEXT}
					</Link>
				</NavbarMenuItem>
			);
		}
		return null; // Added to handle cases where neither condition is met
	});
}
