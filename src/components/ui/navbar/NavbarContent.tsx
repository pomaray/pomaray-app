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
						<Dropdown>
							<DropdownTrigger>
								<span className="text-foreground font-semibold cursor-pointer">
									{item.TEXT}
								</span>
							</DropdownTrigger>
							<DropdownMenu aria-label="Static Actions">
								{item.SUB_ITEMS.map((subItem) => (
									<DropdownItem
										as={Link}
										href={subItem.LINK}
										key={subItem.LINK}
									>
										{subItem.TEXT}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
					</NavbarItem>
				);
			}
		} else if (item.LINK && !isMenu) {
			return (
				<NavbarMenuItem key={item.LINK}>
					<Link
						className="text-foreground font-semibold cursor-pointer"
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
