import i18n from "@/locales/descargas.json";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableCell,
	TableRow,
	Button,
} from "@nextui-org/react";
import { cloneElement, useCallback } from "react";
import { FILE_ICONS } from "./FileIcons";
import { PiDownloadSimpleFill } from "react-icons/pi";
import { type File } from "@/types/general";
import useFiles from "@/hooks/useFiles";
import { TableEmpty } from "../ui/TableEmpty";

export function DowloadsTable() {
	const { isError, isNotFound, isLoading, files } = useFiles();

	const renderCell = useCallback((file: File, columnKey: string) => {
		const cellValue = file[columnKey];
		const defaultFileIcon = FILE_ICONS.find(
			(icon) => Object.keys(icon)[0] === "default",
		)?.default as { icon: JSX.Element; color: string };

		switch (columnKey) {
			case "type": {
				const iconElement =
					FILE_ICONS.find((icon) => Object.keys(icon)[0] === cellValue)?.[
						cellValue as string
					] || defaultFileIcon;

				return (
					<div
						className={`bg-${iconElement.color} w-fit p-1 flex items-center justify-center rounded-lg text-white`}
					>
						{cloneElement(iconElement.icon, {
							size: 20,
						})}
					</div>
				);
			}

			case "download":
				return (
					<Button
						variant="solid"
						isIconOnly
						className="hover:opacity-100 opacity-70 transition-opacity"
					>
						<PiDownloadSimpleFill className="text-lg text-foreground" />
					</Button>
				);
			default:
				return (
					<span className="font-bold text-md opacity-85">{cellValue}</span>
				);
		}
	}, []);

	return (
		<Table
			removeWrapper
			aria-label="Example table with client side pagination"
			className="py-6"
			classNames={{
				thead: "[&>tr]:first:shadow-sm",
			}}
		>
			<TableHeader className="bg-blue-600">
				<TableColumn key="file">{i18n.TABLE.COLUMNS.FILE_NAME}</TableColumn>
				<TableColumn key="type">{i18n.TABLE.COLUMNS.FILE_TYPE}</TableColumn>
				<TableColumn key="size">{i18n.TABLE.COLUMNS.FILE_SIZE}</TableColumn>

				<TableColumn key="date">{i18n.TABLE.COLUMNS.FILE_DATE}</TableColumn>
				<TableColumn key="download">
					{i18n.TABLE.COLUMNS.DOWNLOAD_FILE}
				</TableColumn>
			</TableHeader>

			<TableBody
				emptyContent={
					<TableEmpty
						isError={isError}
						isLoading={isLoading}
						isNotFound={isNotFound}
					/>
				}
				items={files}
			>
				{(file) => (
					<TableRow key={file.name}>
						{(columnKey) => (
							<TableCell>{renderCell(file, columnKey.toString())}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
