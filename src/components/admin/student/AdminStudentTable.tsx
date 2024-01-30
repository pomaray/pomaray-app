"use client";
import { TechIcons } from "@/components/tecnicas/TechIcons";
import { Sex } from "@/types/enums";
import { Student } from "@/types/general";
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
import { TableEmpty } from "@/components/TableEmpty";
import { renderSexColor, renderSexEnum } from "@/utils/enums";
import Link from "next/link";

export function AdminStudentTable({
	students,
	totalPages,
	currentPage,
	isNotFound,
	isError,
	isLoading,
	setCurrentPage,
}: {
	students?: Student[];
	totalPages: number;
	currentPage: number;
	isNotFound: boolean;
	isError: boolean;
	isLoading: boolean;
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
						color={renderSexColor(cellValue as Sex)}
						size="sm"
						variant="flat"
					>
						{renderSexEnum(cellValue as Sex)}
					</Chip>
				);
			case "current_technique": {
				const iconElement = TechIcons.find(
					(icon) => Object.keys(icon)[0] === cellValue,
				)?.[cellValue as string];

				const tecnica = TECH.TECHS.find((item) => item.ID === cellValue);

				return (
					<Button
						as={Link}
						href={`/tecnicas/${cellValue.toString().toLowerCase()}`}
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
			shadow="none"
			className="py-6"
			classNames={{
				wrapper: "shadow-sm",
			}}
			aria-label="Tabla de estudiantes."
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
					<TableEmpty
						isError={isError}
						isNotFound={isNotFound}
						isLoading={isLoading}
					/>
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
