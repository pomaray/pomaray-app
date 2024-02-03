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
	Image,
	Select,
	SelectItem,
	Chip,
} from "@nextui-org/react";
import { EditDocumentBulkIcon, PlusFilledIcon } from "@nextui-org/shared-icons";
import { Sex } from "@/types/enums";
import { Student } from "@/types/general";
import useAuthStore from "@/hooks/useAuth";
import {
	getSexIterables,
	getTechIterables,
	renderSexEnum,
} from "@/utils/enums";
import { FormEvent, useState } from "react";
import { STUDENTS_URL } from "@/types/request/student";
import { validateStudent } from "@/utils/validators";
import axios from "axios";
import { ErrorTxt } from "@/components/ui/Errors";
import { getYears, yearsToIterable } from "@/utils/general";

export function AdminStudentModal({
	student,
	onClose,
}: {
	student?: Student;
	onClose?: () => void;
}) {
	const currentDate = new Date();
	const minDate = new Date(
		currentDate.getFullYear() - 8,
		currentDate.getMonth(),
		currentDate.getDate(),
	);

	const emptyStudent = {
		sigerd_id: 0,
		current_technique: "",
		first_name: "",
		last_name: "",
		photo_url: "",
		school_years: [],
		rne: "",
		sex: Sex.Male,
		birth_date: "",
	};
	const [newStudent, setNewStudent] = useState<Student>(
		student ?? emptyStudent,
	);
	const [error, setError] = useState("");
	const { user, isLoading } = useAuthStore();
	const { isOpen, onOpen, onOpenChange, onClose: Close } = useDisclosure();

	const createStudent = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validated = validateStudent(newStudent);
		if (validated !== null) {
			setError(validated);
			return;
		}

		setError(""); // Limpiamos el error si la validación fue exitosa

		try {
			const response = !student
				? await axios.post(STUDENTS_URL, newStudent, {
						headers: {
							"Content-Type": "application/json",
						},
				  })
				: await axios.put(`${STUDENTS_URL}/${student.id}`, newStudent, {
						headers: {
							"Content-Type": "application/json",
						},
				  });

			const { student: reponseStudent } = response.data;
			if (!reponseStudent) {
				throw new Error("Student not provided");
			}

			onClose?.();
			Close();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.message);
			} else {
				// Si es otro tipo de error, manejarlo en consecuencia
				setError("Hubo un error, por favor inténtelo de nuevo.");
			}
			console.log(error);
		}
	};

	const deleteStudent = async () => {
		setError(""); // Limpiamos el error si la validación fue exitosa

		try {
			await axios.delete(`${STUDENTS_URL}/${student?.id}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			onClose?.();
			Close();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.message);
			} else {
				// Si es otro tipo de error, manejarlo en consecuencia
				setError("Hubo un error, por favor inténtelo de nuevo.");
			}
		}
	};

	return (
		<>
			<Tooltip
				closeDelay={300}
				content={student ? "Editar estudiante" : "Agreagar estudiantes"}
				color="primary"
			>
				<Button
					isDisabled={(user && user.role < 1) || isLoading}
					onPress={onOpen}
					variant="solid"
					isIconOnly
					color={!student ? "primary" : "default"}
					className="hover:opacity-100 opacity-70 transition-opacity"
				>
					{student ? (
						<EditDocumentBulkIcon className="text-lg text-foreground" />
					) : (
						<PlusFilledIcon className="text-lg text-white" />
					)}
				</Button>
			</Tooltip>
			<Modal
				backdrop="opaque"
				isOpen={isOpen}
				onOpenChange={() => {
					!student && setNewStudent(emptyStudent);
					onOpenChange();
					setError("");
				}}
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
							<ModalHeader className="flex justify-between items-center w-full pr-12">
								<div className="flex flex-col gap-1 text-sm">
									<span className="opacity-75">
										{student ? "Editando a:" : "Insertar nuevo estudiante:"}
									</span>
									<span className="text-3xl">
										{newStudent
											? `${newStudent.first_name} ${newStudent.last_name}`
											: ""}
									</span>
									<div className="text-foreground">
										<span className="opacity-60">SIGERD ID: </span>
										<span className="font-bold">
											{newStudent?.sigerd_id !== 0
												? newStudent?.sigerd_id.toString()
												: ""}
										</span>
									</div>
								</div>
								<Image
									width={70}
									src={newStudent?.photo_url}
									alt={newStudent?.first_name}
								/>
							</ModalHeader>
							<form onSubmit={createStudent}>
								<ModalBody>
									<Input
										size="sm"
										variant="bordered"
										label="SIGERD ID"
										type="number"
										value={
											newStudent?.sigerd_id !== 0
												? newStudent?.sigerd_id.toString()
												: ""
										}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											const newSigerdId = Number(e.target.value);
											if (!Number.isNaN(newSigerdId) && newSigerdId > 0) {
												setNewStudent((prev) => ({
													...prev,
													sigerd_id: newSigerdId,
												}));
											}
										}}
										isRequired
									/>
									<Input
										size="sm"
										variant="bordered"
										label="Foto de perfil"
										type="url"
										value={newStudent?.photo_url}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											setNewStudent((prev) => ({
												...prev,
												photo_url: e.target.value,
											}));
										}}
										isRequired
										required
									/>
									<Input
										size="sm"
										variant="bordered"
										label="Nombres del esutudiante:"
										value={newStudent ? newStudent.first_name : ""}
										isRequired
										required
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											setNewStudent((prev) => ({
												...prev,
												first_name: e.target.value,
											}));
										}}
									/>
									<Input
										size="sm"
										variant="bordered"
										label="Apellidos del esutudiante:"
										value={newStudent ? newStudent.last_name : ""}
										isRequired
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											setNewStudent((prev) => ({
												...prev,
												last_name: e.target.value,
											}));
										}}
									/>
									<Input
										type="date"
										variant="bordered"
										label="Fecha de nacimiento:"
										placeholder="None"
										isRequired
										value={newStudent ? newStudent.birth_date : ""}
										max={minDate.toISOString().slice(0, 10)}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											console.log(e.target.value);

											setNewStudent((prev) => ({
												...prev,
												birth_date: e.target.value,
											}));
										}}
									/>
									<Select
										size="sm"
										variant="bordered"
										items={getSexIterables()}
										label="Sexo:"
										defaultSelectedKeys={
											student ? [student.sex.toString()] : []
										}
										fullWidth
										renderValue={(items) => (
											<span className="capitalize text-foreground">
												{items.length > 0
													? renderSexEnum(items[0].textValue as unknown as Sex)
													: undefined}
											</span>
										)}
										onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
											setNewStudent((prev) => ({
												...prev,
												sex: e.target.value as Sex,
											}));
										}}
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

									<Select
										size="sm"
										variant="bordered"
										items={getTechIterables()}
										label="Tecnica:"
										defaultSelectedKeys={
											student ? [student.current_technique] : []
										}
										fullWidth
										renderValue={(items) => (
											<span className="capitalize text-foreground">
												{items[0].textValue}
											</span>
										)}
										onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
											setNewStudent((prev) => ({
												...prev,
												current_technique: e.target.value as string,
											}));
										}}
									>
										{(tech) => (
											<SelectItem
												className="capitalize"
												key={tech.key.toString()}
												textValue={tech.key as string}
											>
												{tech.value}
											</SelectItem>
										)}
									</Select>
									<Select
										items={yearsToIterable(getYears())}
										label="Peridos escolars"
										variant="bordered"
										isMultiline={true}
										selectionMode="multiple"
										labelPlacement="outside"
										defaultSelectedKeys={student?.school_years.map((year) =>
											year.toString(),
										)}
										renderValue={(items) => {
											return (
												<div className="flex flex-wrap gap-2">
													{items.map((item) => (
														<Chip key={item.key}>{item.textValue}</Chip>
													))}
												</div>
											);
										}}
										onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
											setNewStudent((prev) => ({
												...prev,
												school_years: e.target.value
													.split(",")
													.map((year) => Number(year)),
											}));
										}}
									>
										{(year) => (
											<SelectItem
												key={year.key}
												textValue={year.value as string}
											>
												{year.key}
											</SelectItem>
										)}
									</Select>
									<ErrorTxt>{error}</ErrorTxt>
								</ModalBody>
								<ModalFooter>
									<Button type="submit" fullWidth color="primary">
										{student ? "Actualizar" : "Crear"}
									</Button>
									{student && (
										<Button
											onPress={deleteStudent}
											fullWidth
											color="danger"
											variant="bordered"
										>
											Eliminar
										</Button>
									)}
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
