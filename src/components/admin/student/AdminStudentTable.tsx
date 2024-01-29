"use client";
import { TECH_ICONS } from "@/components/tecnicas/TechIcons";
import { sexColorMap } from "@/types/enums";
import { Student } from "@/types/student";
import {
	User,
	Chip,
	Button,
	Table,
	Pagination,
	TableHeader,
	TableColumn,
	TableBody,
	Spinner,
	TableRow,
	TableCell,
} from "@nextui-org/react";
import { useCallback, cloneElement } from "react";
import { AdminEditStudentModal } from "./AdminEditStudentModal";
import TECH from "@/locales/tecnicas.json";

export function AdminStudentTable({
	students,
	totalPages,
	currentPage,
	setCurrentPage,
}: {
	students?: Student[];
	totalPages: number;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
	const renderCell = useCallback((student: Student, columnKey: string) => {
		const cellValue = student[columnKey];

		switch (columnKey) {
			case "photo_url":
				return (
					<User
						avatarProps={{ radius: "lg", src: student.photo_url }}
						description={student.last_name}
						name={student.first_name}
					/>
				);
			case "sex":
				return (
					<Chip
						className="capitalize"
						color={sexColorMap[student.sex]}
						size="sm"
						variant="flat"
					>
						{cellValue}
					</Chip>
				);
			case "current_technique": {
				const iconElement = TECH_ICONS.find(
					(icon) => Object.keys(icon)[0] === cellValue,
				)?.[cellValue as string];

				const tecnica = TECH.TECNICAS.find((item) => item.ID === cellValue);

				return (
					<Button
						size="sm"
						className="p-2 text-white"
						isIconOnly
						variant="light"
						style={{
							backgroundColor: tecnica?.COLOR,
						}}
					>
						{iconElement &&
							cloneElement(iconElement, {
								size: 20,
							})}
					</Button>
				);
			}

			case "school_years": {
				const value = cellValue as number[];
				return value[value.length - 1];
			}
			case "actions":
				return <AdminEditStudentModal student={student} />;

			default:
				return <i>{cellValue}</i>;
		}
	}, []);

	return (
		<Table
			aria-label="Example table with client side pagination"
			className="py-6"
			bottomContent={
				<div className="flex w-full justify-center">
					<Pagination
						isCompact
						showControls
						showShadow
						isDisabled={totalPages < 2}
						total={totalPages < 2 ? 1 : totalPages}
						onChange={(page) => setCurrentPage(page)}
						page={currentPage}
					/>
				</div>
			}
		>
			<TableHeader className="bg-default-200">
				<TableColumn key="sigerd_id">SIGERD ID</TableColumn>

				<TableColumn key="photo_url">Perfil</TableColumn>
				<TableColumn key="sex">Sexo</TableColumn>
				<TableColumn key="school_years">Ultimo ano escolar</TableColumn>

				<TableColumn key="current_technique">Técnica</TableColumn>
				<TableColumn key="actions">Acciones</TableColumn>
			</TableHeader>

			<TableBody
				emptyContent={
					<div className="min-h-[75vh] grid place-content-center">
						<Spinner label="Cargando estudiantes" />
					</div>
				}
				items={students}
			>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey.toString())}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
