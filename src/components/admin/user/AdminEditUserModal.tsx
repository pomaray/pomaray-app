"use client";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
	Checkbox,
	CheckboxGroup,
	Select,
	Selection,
	SelectItem,
} from "@nextui-org/react";
import { PressEvent } from "@react-types/shared";
import { AvatarIcon } from "@nextui-org/shared-icons";
import { User } from "@/types/user";
import { Role, Roles, Sex, Sexos } from "@/types/enums";
import useAuthStore from "@/hooks/useAuth";
import { useState } from "react";

interface AdminEditUserModal {
	editUser?: User;
	color?: "primary" | "default";
	variant?: "flat" | "bordered" | "light" | "solid";
}

export function AdminEditUserModal({
	editUser,
	color = "primary",
	variant = "solid",
}: AdminEditUserModal) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { user, isLoading } = useAuthStore();
	const [role, setRole] = useState<Selection>(new Set([]));

	return (
		<>
			<Tooltip content="Editar usuario" color="primary">
				<Button
					isDisabled={user?.role !== Role.SUPER_ADMIN || isLoading}
					onPress={onOpen}
					variant={variant}
					isIconOnly
					color={color}
				>
					<AvatarIcon className="text-lg text-background" />
				</Button>
			</Tooltip>
			<Modal
				backdrop="opaque"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				classNames={{
					backdrop:
						"bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
				}}
				motionProps={{
					variants: {
						enter: {
							y: 0,
							opacity: 1,
							transition: {
								duration: 0.3,
								ease: "easeOut",
							},
						},
						exit: {
							y: 20,
							opacity: 0,
							transition: {
								duration: 0.2,
								ease: "easeIn",
							},
						},
					},
				}}
			>
				<ModalContent>
					{(onClose: ((e: PressEvent) => void) | undefined) => (
						<>
							<ModalHeader className="flex flex-col gap-1 text-sm">
								<span className="opacity-75">Editando a:</span>
								<span className="text-3xl">{editUser?.username}</span>
								<div className="text-foreground">
									<span className="opacity-60">Role: </span>
									<span className="font-bold capitalize">
										{editUser?.role
											? Role[editUser?.role].toLowerCase().replaceAll("_", " ")
											: "Ninguno"}
									</span>
								</div>
							</ModalHeader>
							<form onSubmit={() => onOpen()}>
								<ModalBody>
									<Input
										color="primary"
										variant="bordered"
										label="Nombre de usuario"
										value={editUser?.username}
										isRequired
									/>
									<Input
										color="primary"
										variant="bordered"
										label="Nombre a mostrar:"
										value={editUser?.display_name}
										isRequired
									/>
									{Roles && user?.role && user.role >= 2 && (
										<Select
											color="primary"
											variant="bordered"
											items={Roles}
											label="Rol"
											defaultSelectedKeys={[user?.role.toString()]}
											fullWidth
											onSelectionChange={setRole}
											renderValue={(items) => (
												<span className="capitalize text-foreground">
													{items[0].textValue
														?.toLowerCase()
														.replaceAll("_", " ")}
												</span>
											)}
										>
											{(role) => (
												<SelectItem
													className="capitalize"
													key={role.key.toString()}
													textValue={role.value}
												>
													{role.value.toLowerCase().replaceAll("_", " ")}
												</SelectItem>
											)}
										</Select>
									)}

									{Sexos && user?.sex && (
										<Select
											color="primary"
											variant="bordered"
											items={Sexos}
											label="Sexo:"
											defaultSelectedKeys={[user?.sex.toString()]}
											fullWidth
											onSelectionChange={setRole}
											renderValue={(items) => (
												<span className="capitalize text-foreground">
													{items[0].textValue === Sex.MALE ? "Hombre" : "Mujer"}
												</span>
											)}
										>
											{(role) => (
												<SelectItem
													className="capitalize"
													key={role.key.toString()}
													textValue={role.key as string}
												>
													{role.key === Sex.MALE ? "Hombre" : "Mujer"}
												</SelectItem>
											)}
										</Select>
									)}
								</ModalBody>
								<ModalFooter>
									<Button fullWidth color="primary" onPress={onClose}>
										Guardar
									</Button>
									<Button fullWidth variant="bordered" onPress={onClose}>
										Cerrar
									</Button>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
