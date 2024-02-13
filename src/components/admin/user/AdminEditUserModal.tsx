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
	Select,
	SelectItem,
} from "@nextui-org/react";
import { AvatarIcon, EditDocumentBulkIcon } from "@nextui-org/shared-icons";
import { User } from "@/types/general";
import { Role, Sex } from "@/types/enums";
import useAuthStore from "@/hooks/useAuth";
import {
	getRoleIterables,
	getSexIterables,
	renderRoleEnum,
	renderSexEnum,
} from "@/utils/enums";

interface AdminEditUserModal {
	editUser?: User;
	isSession?: boolean;
	onClose?: () => void;
}

export function AdminEditUserModal({
	editUser,
	isSession,
	onClose,
}: AdminEditUserModal) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { user, isLoading } = useAuthStore();

	return (
		<>
			<Tooltip
				content={isSession ? "Editar mi usuario" : "Editar usuario"}
				color="primary"
			>
				<Button
					isDisabled={user?.role !== Role.SUPER_ADMIN || isLoading}
					onPress={onOpen}
					color={isSession ? "primary" : "default"}
					isIconOnly
				>
					{!isSession ? (
						<EditDocumentBulkIcon className="text-lg text-gray-500" />
					) : (
						<AvatarIcon className="text-lg text-background" />
					)}
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
					{() => (
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
										variant="bordered"
										label="Nombre de usuario"
										value={editUser?.username}
										isRequired
									/>
									<Input
										variant="bordered"
										label="Nombre a mostrar:"
										value={editUser?.display_name}
										isRequired
									/>
									{user?.role && user.role >= 2 && (
										<Select
											variant="bordered"
											items={getRoleIterables()}
											label="Rol"
											defaultSelectedKeys={[user?.role.toString()]}
											fullWidth
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
											size="sm"
											variant="bordered"
											items={getSexIterables()}
											label="Sexo:"
											defaultSelectedKeys={user ? [user.sex.toString()] : []}
											fullWidth
											renderValue={(items) => (
												<span className="capitalize text-foreground">
													{items.length > 0
														? renderSexEnum(
																items[0].textValue as unknown as Sex,
														  )
														: undefined}
												</span>
											)}
										>
											{(sex) => (
												<SelectItem
													className="capitalize"
													key={sex.key.toString()}
													textValue={sex.key.toString()}
												>
													{renderSexEnum(sex.key as Sex)}
												</SelectItem>
											)}
										</Select>
									)}
								</ModalBody>
								<ModalFooter>
									<Button fullWidth color="primary">
										Guardar
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
