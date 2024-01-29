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
	Select,
	SelectItem,
	Autocomplete,
	AutocompleteItem,
	Chip,
} from "@nextui-org/react";
import { PressEvent } from "@react-types/shared";
import { EditDocumentBulkIcon } from "@nextui-org/shared-icons";
import { Role, Sex, Sexos, Techs } from "@/types/enums";
import { Student } from "@/types/student";
import useAuthStore from "@/hooks/useAuth";

export function AdminEditStudentModal({
	student,
}: {
	student: Student;
}) {
	const { user, isLoading } = useAuthStore();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const years = (): { key: string; value: string }[] => {
		const currentYear: number = new Date().getFullYear();
		const yearObjects: { key: string; value: string }[] = [];

		for (let year = 2010; year <= currentYear; year++) {
			yearObjects.push({
				key: year.toString(),
				value: year.toString(),
			});
		}

		return yearObjects;
	};

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
									<div className="text-foreground">
										<span className="opacity-60">SIGERD ID: </span>
										<span className="font-bold">{student?.sigerd_id}</span>
									</div>
								</div>
								<Image
									width={70}
									src={student?.photo_url}
									alt={student?.first_name}
								/>
							</ModalHeader>
							<ModalBody>
								<Input
									size="sm"
									color="primary"
									variant="bordered"
									label="Foto de perfil"
									value={student?.photo_url}
									isRequired
								/>
								<Input
									size="sm"
									color="primary"
									variant="bordered"
									label="Nombre del esutudiante:"
									value={`${student?.first_name} ${student?.last_name}`}
									isRequired
								/>
								<Select
									size="sm"
									color="primary"
									variant="bordered"
									items={Sexos}
									label="Sexo:"
									defaultSelectedKeys={[student?.sex.toString()]}
									fullWidth
									renderValue={(items) => (
										<span className="capitalize text-foreground">
											{items[0].textValue === Sex.FEMALE ? "Mujer" : "Homber"}
										</span>
									)}
								>
									{(role) => (
										<SelectItem
											className="capitalize"
											key={role.key.toString()}
											textValue={role.key.toString()}
										>
											{role.key === Sex.FEMALE ? "Mujer" : "Hombre"}
										</SelectItem>
									)}
								</Select>

								<Select
									size="sm"
									color="primary"
									variant="bordered"
									items={Techs}
									label="Tecnica:"
									defaultSelectedKeys={[student?.current_technique]}
									fullWidth
									renderValue={(items) => (
										<span className="capitalize text-foreground">
											{items[0].textValue}
										</span>
									)}
								>
									{(role) => (
										<SelectItem
											className="capitalize"
											key={role.key.toString()}
											textValue={role.key as string}
										>
											{role.value}
										</SelectItem>
									)}
								</Select>
								<Select
									color="primary"
									items={years()}
									label="Peridos escolars"
									variant="bordered"
									isMultiline={true}
									selectionMode="multiple"
									labelPlacement="outside"
									defaultSelectedKeys={student?.school_years.map((year) =>
										year.toString(),
									)}
									fullWidth
									renderValue={(items) => {
										return (
											<div className="flex flex-wrap gap-2">
												{items.map((item) => (
													<Chip key={item.key}>{item.textValue}</Chip>
												))}
											</div>
										);
									}}
								>
									{(year) => (
										<SelectItem key={year.key} textValue={year.value}>
											{year.key}
										</SelectItem>
									)}
								</Select>
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
