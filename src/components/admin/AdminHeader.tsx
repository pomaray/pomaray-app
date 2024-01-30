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
import { CheckIcon } from "@nextui-org/shared-icons";
import { FaRightFromBracket } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminEditUserModal } from "@/components/admin/user/AdminEditUserModal";

export function Header() {
	const [selectedLocation, setSelectedLocation] = useState({
		href: "",
		children: "",
	});
	const { user, getUserByToken } = useAuthStore();
	const router = useRouter();
	const locations = [
		{
			href: "usuarios",
			children: "Usuarios",
		},
		{
			href: "estudiantes",
			children: "Estudiantes",
		},
		{
			href: "noticias",
			children: "Noticias",
		},
		{
			href: "descargas",
			children: "Descargas",
		},
	];

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

		// Obtener el href actual de la ventana
		const currentHref = window.location.href;

		// Encontrar la ubicación correspondiente al href actual
		const foundLocation = locations.find((location) =>
			currentHref.includes(location.href),
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
					<Chip color="primary" variant="bordered">
						Session iniciada como: {user?.username}
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
					isLoaded={selectedLocation.children !== ""}
				>
					<Breadcrumbs
						classNames={{
							list: "shadow-sm bg-default-200",
						}}
						variant="solid"
					>
						<BreadcrumbItem>Casa</BreadcrumbItem>
						<BreadcrumbItem>Admin</BreadcrumbItem>
						<BreadcrumbItem>
							<Dropdown>
								<DropdownTrigger>
									<span>{selectedLocation.children}</span>
								</DropdownTrigger>
								<DropdownMenu aria-label="Routes">
									{locations.map((item) => (
										<DropdownItem key={item.href} href={item.href}>
											<span className="flex gap-x-2">
												{item.href === selectedLocation.href && (
													<CheckIcon className="text-lg" />
												)}{" "}
												{item.children}
											</span>
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
						</BreadcrumbItem>
					</Breadcrumbs>
				</Skeleton>
			</div>
			<div className="flex gap-4 items-end">
				<AdminEditUserModal editUser={user} />
				<Tooltip content="Cerrar session" color="primary">
					<Button isIconOnly color="primary" variant="bordered">
						<FaRightFromBracket className="text-lg" />
					</Button>
				</Tooltip>
			</div>
		</section>
	);
}
