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
	Chip,
	DropdownMenu,
	Checkbox,
	CheckboxGroup,
} from "@nextui-org/react";
import { PressEvent } from "@react-types/shared";
import { EditDocumentBulkIcon, EditIcon } from "@nextui-org/shared-icons";
import { User } from "@/types/user";
import { Role, Sex } from "@/types/enums";
import useAuthStore from "@/hooks/useAuth";

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
					<EditDocumentBulkIcon className="text-lg text-background" />
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
								<span>
									{" "}
									Role:{" "}
									<span className="text-primary">
										{editUser?.role ? Role[editUser?.role] : "Ninguno"}
									</span>
								</span>
							</ModalHeader>
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
								<div>
									<CheckboxGroup
										orientation="horizontal"
										label="Sexo:"
										defaultValue={[editUser?.sex as string]}
									>
										<Checkbox value={Sex.MALE}>Masculino</Checkbox>
										<Checkbox value={Sex.FEMALE}>Femenino</Checkbox>
									</CheckboxGroup>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button fullWidth color="primary" onPress={onClose}>
									Guardar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
