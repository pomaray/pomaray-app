"use client";

import useAuthStore from "@/hooks/useAuth";
import {
	BreadcrumbItem,
	Breadcrumbs,
	Button,
	Chip,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Skeleton,
	Tooltip,
} from "@nextui-org/react";
import { FaRightFromBracket } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminEditUserModal } from "@/components/admin/user/AdminEditUserModal";
import { renderRoleEnum } from "@/utils/enums";
import { LOGIN_URL } from "@/types/request/auth";

export function Header() {
	const [selectedLocation, setSelectedLocation] = useState({
		href: "",
		children: "",
	});
	const { user, getUserByToken } = useAuthStore();
	const router = useRouter();
	const locations = [
		{
			href: "/admin",
			children: "Usuarios",
		},
		{
			href: "/admin/estudiantes",
			children: "Estudiantes",
		},
		{
			href: "/admin/noticias",
			children: "Noticias",
		},
		{
			href: "/admin/descargas",
			children: "Descargas",
		},
		{
			href: "/admin/sesiones",
			children: "Sesiones",
		},
	];

	const logout = async () => {
		await fetch(LOGIN_URL, {
			method: "DELETE",
		});
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetch = async () => {
			// Obtener el usuario (reemplaza esto con tu lógica real)
			const user = await getUserByToken();

			if (!user) {
				router.push("/acceder");
				return;
			}
		};
		// Encontrar la ubicación correspondiente al href actual
		const foundLocation = locations.find((location) =>
			window.location.href.endsWith(location.href),
		);

		// Actualizar el estado de la ubicación seleccionada
		if (foundLocation) {
			setSelectedLocation(foundLocation);
		}

		// Llamar a la función de fetch
		fetch();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Asegúrate de que esta dependencia esté correcta según tu lógica

	return (
		<section className="flex sm:flex-row flex-col gap-6 justify-between pb-6 px-6 overflow-hidden">
			<div className="flex flex-col gap-4">
				<Skeleton
					className="rounded-lg w-fit"
					disableAnimation
					isLoaded={!!user}
				>
					<Chip color="primary" variant="bordered" className="capitalize">
						Session iniciada como: {user && renderRoleEnum(user.role)}
					</Chip>
				</Skeleton>
				<Skeleton
					className={`rounded-lg ${!user && "w-96 h-8"}`}
					disableAnimation
					isLoaded={!!user}
				>
					<h1 className="font-normal text-3xl">
						Bienvenido{" "}
						<span className="font-bold text-4xl">{user?.display_name}</span>
					</h1>
				</Skeleton>
				<Skeleton
					className={`rounded-lg ${!user && "w-64 h-8"}`}
					disableAnimation
					isLoaded={!!user}
				>
					<Breadcrumbs
						color="foreground"
						classNames={{
							list: "shadow-sm bg-default-200",
						}}
						variant="solid"
					>
						<BreadcrumbItem href="/">Casa</BreadcrumbItem>
						<BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
						<BreadcrumbItem>
							<Dropdown>
								<DropdownTrigger>
									<span
										className={selectedLocation.href === "" ? "opacity-70" : ""}
									>
										{selectedLocation.children || "Usuarios"}
									</span>
								</DropdownTrigger>
								<DropdownMenu aria-label="Routes">
									{locations.map((item) => (
										<DropdownItem
											closeOnSelect
											key={item.href}
											href={item.href}
											className={
												selectedLocation.href !== item.href ? "opacity-75" : ""
											}
										>
											{item.children}
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
						</BreadcrumbItem>
					</Breadcrumbs>
				</Skeleton>
			</div>
			<div className="flex gap-4 items-end">
				<AdminEditUserModal isSession editUser={user} />
				<Tooltip content="Cerrar session" color="primary">
					<Button
						onPress={logout}
						isIconOnly
						color="primary"
						variant="bordered"
					>
						<FaRightFromBracket className="text-lg" />
					</Button>
				</Tooltip>
			</div>
		</section>
	);
}
