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
	Image,
} from "@nextui-org/react";
import { PressEvent } from "@react-types/shared";
import { EditDocumentBulkIcon } from "@nextui-org/shared-icons";
import { Role, Sex } from "@/types/enums";
import { Student } from "@/types/student";
import useAuthStore from "@/hooks/useAuth";

export function AdminEditStudentModal({
	student,
}: {
	student: Student;
}) {
	const { user, isLoading } = useAuthStore();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Tooltip content="Editar estudiante" color="primary">
				<Button
					isDisabled={user?.role !== Role.SUPER_ADMIN || isLoading}
					onPress={onOpen}
					variant="solid"
					isIconOnly
					className="hover:opacity-100 opacity-70 transition-opacity"
				>
					<EditDocumentBulkIcon className="text-lg text-foreground" />
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
							<ModalHeader className="flex justify-between items-center w-full pr-12">
								<div className="flex flex-col gap-1 text-sm">
									<span className="opacity-75">Editando a:</span>
									<span className="text-3xl">{`${student?.first_name} ${student?.last_name}`}</span>
									<span>
										SIGERD ID:{" "}
										<span className="text-primary">{student?.sigerd_id}</span>
									</span>
								</div>
								<Image
									width={70}
									src={student?.photo_url}
									alt={student?.first_name}
								/>
							</ModalHeader>
							<ModalBody>
								<Input
									color="primary"
									variant="bordered"
									label="Foto de perfil"
									value={student?.photo_url}
									isRequired
								/>
								<Input
									color="primary"
									variant="bordered"
									label="Nombre del esutudiante:"
									value={`${student?.first_name} ${student?.last_name}`}
									isRequired
								/>
								<div>
									<CheckboxGroup
										orientation="horizontal"
										label="Sexo:"
										defaultValue={[student?.sex as string]}
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
