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
import { User } from "@/types/general";
import { Role, Sex } from "@/types/enums";
import useAuthStore from "@/hooks/useAuth";
import { useState } from "react";
import {
	getRoleIterables,
	getSexIterables,
	renderRoleEnum,
	renderSexEnum,
} from "@/utils/enums";

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
									{user?.role && user.role >= 2 && (
										<Select
											color="primary"
											variant="bordered"
											items={getRoleIterables()}
											label="Rol"
											defaultSelectedKeys={[user?.role.toString()]}
											fullWidth
											onSelectionChange={setRole}
											renderValue={(items) => (
												<span className="capitalize text-foreground">
													{items.length > 0
														? renderRoleEnum(
																items[0].textValue as unknown as Role,
														  )
														: undefined}
												</span>
											)}
										>
											{(role) => (
												<SelectItem
													className="capitalize"
													key={role.key.toString()}
													textValue={role.key as string}
												>
													{renderRoleEnum(role.key as Role)}
												</SelectItem>
											)}
										</Select>
									)}

									{user?.sex && (
										<Select
											color="primary"
											variant="bordered"
											items={getSexIterables()}
											label="Sexo:"
											defaultSelectedKeys={[user?.sex.toString().toUpperCase()]}
											fullWidth
											onSelectionChange={setRole}
											renderValue={(items) => (
												<span className="capitalize text-foreground">
													{items.length > 0
														? renderSexEnum(items[0].textValue as Sex)
														: undefined}
												</span>
											)}
										>
											{(sex) => (
												<SelectItem
													className="capitalize"
													key={sex.key}
													textValue={sex.key as string}
												>
													{renderSexEnum(sex.key as Sex)}
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
