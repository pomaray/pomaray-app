"use client";
import { type Session } from "@/types/general";
import {
	User as Avatar,
	Chip,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Skeleton,
} from "@nextui-org/react";
import { useCallback } from "react";
import { AdminEditSessionModal } from "./AdminEditSessionModal";
import { TableEmpty } from "@/components/ui/TableEmpty";
import useUsers from "@/hooks/useUsers";

export function AdminSessionTable({
	sessions,
	isNotFound,
	isError,
	isLoading,
	fetchData,
}: {
	sessions?: Session[];
	isNotFound: boolean;
	isError: boolean;
	isLoading: boolean;
	fetchData: () => void;
}) {
	const { users, isLoading: isUserLoading } = useUsers();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const renderCell = useCallback(
		(session: Session, columnKey: string) => {
			const cellValue = session[columnKey];

			switch (columnKey) {
				case "user_id": {
					const user = users.find((u) => u.id === session.user_id);
					return (
						<Avatar
							avatarProps={{ radius: "lg" }}
							description={user?.username}
							name={user?.display_name}
						/>
					);
				}
				case "device":
					return (
						<Chip
							className="capitalize"
							color="primary"
							size="sm"
							variant="flat"
						>
							{cellValue?.toString()}
						</Chip>
					);
				case "actions":
					return (
						<AdminEditSessionModal onClose={fetchData} editSession={session} />
					);

				default:
					return (
						<i className="block max-w-[20ch] text-nowrap text-ellipsis overflow-hidden">
							{cellValue as string}
						</i>
					);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

				<TableColumn key="ip">IP</TableColumn>
				<TableColumn key="user_id">Usuario</TableColumn>

				<TableColumn key="device">Dispositivo</TableColumn>

				<TableColumn key="actions">Elimar</TableColumn>
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
				items={sessions}
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
