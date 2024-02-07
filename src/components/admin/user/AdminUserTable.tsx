"use client";
import { Role, Sex } from "@/types/enums";
import { type User } from "@/types/general";
import {
	User as Avatar,
	Chip,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@nextui-org/react";
import { useCallback } from "react";
import { AdminEditUserModal } from "./AdminEditUserModal";
import { TableEmpty } from "@/components/ui/TableEmpty";
import { renderRoleEnum, renderSexColor, renderSexEnum } from "@/utils/enums";

export function AdminUserTable({
	users,
	isNotFound,
	isError,
	isLoading,
	fetchData,
}: {
	users?: User[];
	isNotFound: boolean;
	isError: boolean;
	isLoading: boolean;
	fetchData: () => void;
}) {
	const renderCell = useCallback(
		(user: User, columnKey: string) => {
			const cellValue = user[columnKey];

			switch (columnKey) {
				case "display_name":
					return (
						<Avatar
							avatarProps={{ radius: "lg" }}
							description={user.username}
							name={user.display_name}
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
				case "role": {
					return (
						<Chip className="capitalize" size="sm" color="primary">
							{renderRoleEnum(cellValue as Role)}
						</Chip>
					);
				}
				case "actions":
					return <AdminEditUserModal onClose={fetchData} editUser={user} />;

				default:
					return (
						<i className="block max-w-[20ch] text-nowrap text-ellipsis overflow-hidden">
							{cellValue as string}
						</i>
					);
			}
		},
		[fetchData],
	);

	return (
		<Table
			shadow="none"
			className="py-6"
			classNames={{
				wrapper: "shadow-sm",
			}}
			aria-label="Tabla de estudiantes."
		>
			<TableHeader className="bg-default-200">
				<TableColumn key="id">ID</TableColumn>

				<TableColumn key="display_name">Perfil</TableColumn>
				<TableColumn key="role">Rol</TableColumn>

				<TableColumn key="sex">Ultimo ano escolar</TableColumn>

				<TableColumn key="actions">Editar</TableColumn>
			</TableHeader>

			<TableBody
				emptyContent={
					<TableEmpty
						isError={isError}
						isNotFound={isNotFound}
						isLoading={isLoading}
						onTry={fetchData}
					/>
				}
				items={users}
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
